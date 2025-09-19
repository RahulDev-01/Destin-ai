// Importing necessary modules and components
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { GoogleGenAI } from "@google/genai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/lib/seo";

function CreateTrip() {
  const [opendialoge, setOpenDialoge] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    Peoples: "",
  });
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // SEO for Create Trip page
  useSEO({
    title: "Create Trip | Destin AI",
    description:
      "Tell us your travel preferences and let Destin AI generate a personalized itinerary in seconds.",
    image: "/hero.png",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      const { access_token } = codeResp;
      GetUSerProfile(access_token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialoge(true);
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.Peoples) {
      toast("Please fill all details");
      return;
    }

    // Add this block to check for more than 20 days
    if (parseInt(formData.noOfDays, 10) > 20) {
      toast("You cannot proceed with more than 20 days.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Peoples)
      .replace("{budget}", formData?.budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
    });

    const tools = [{ googleSearch: {} }];
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
      systemInstruction: [{ text: FINAL_PROMPT }],
    };
    const model = "gemini-2.5-pro";
    const contents = [
      {
        role: "user",
        parts: [{ text: FINAL_PROMPT }],
      },
    ];

    let fullResponse = "";

    try {
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      for await (const chunk of response) {
        fullResponse += chunk.text || "";
        console.log("Streamed Chunk: ", chunk.text);
      }

      // Extract JSON from response (robust handling)
      const parsedTrip = parseAiJson(fullResponse);
      if (!parsedTrip) {
        toast("Failed to extract trip data from AI response.");
        console.error("Could not parse AI response into JSON.", fullResponse);
        setLoading(false);
        return;
      }
      const normalized = normalizeTripData(parsedTrip);
      await SaveAiTrip(normalized); // Save structured data
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast("There was an error generating your trip plan.");
    }

    setLoading(false);
  };

  // Try to parse JSON from an LLM response with various fence styles or raw JSON
  const parseAiJson = (text) => {
    if (!text) return null;
    const clean = (s) => s.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

    const candidates = [];
    // ```json ... ```
    const fenceJson = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (fenceJson && fenceJson[1]) candidates.push(clean(fenceJson[1]));
    // ``` ... ``` (no language)
    const fenceAny = text.match(/```\s*([\s\S]*?)\s*```/);
    if (fenceAny && fenceAny[1]) candidates.push(clean(fenceAny[1]));
    // Raw: from first { to last }
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      candidates.push(clean(text.substring(firstBrace, lastBrace + 1)));
    }
    // Fallback: entire text
    candidates.push(clean(text));

    for (const c of candidates) {
      try {
        return JSON.parse(c);
      } catch (e) {
        continue;
      }
    }
    return null;
  };

  // Normalize AI response to the schema expected by the view components
  const normalizeTripData = (raw) => {
    try {
      const data = raw?.trip ? raw.trip : raw;

      const normalizeHotels = (hotelsInput) => {
        if (!Array.isArray(hotelsInput)) return [];
        return hotelsInput.map((h) => {
          const name = h?.hotelName || h?.name || h?.title || h?.hotel || "";
          const address = h?.hotelAddress || h?.address || h?.location || "";
          const price = h?.price || h?.cost || h?.pricing || h?.rate || "";
          const rating = h?.rating || h?.stars || h?.score || "";
          return {
            hotelName: String(name),
            hotelAddress: String(address),
            price: typeof price === "number" || typeof price === "string" ? price : "",
            rating: typeof rating === "number" || typeof rating === "string" ? rating : "",
          };
        });
      };

      const findHotelsDeep = (obj) => {
        const results = [];
        const visit = (node) => {
          if (!node || typeof node !== "object") return;
          if (Array.isArray(node)) {
            const normalized = normalizeHotels(node);
            if (normalized.length >= 1) {
              results.push(...normalized);
            } else {
              node.forEach(visit);
            }
            return;
          }
          // direct candidates by key name
          Object.entries(node).forEach(([k, v]) => {
            const key = String(k).toLowerCase();
            if (key.includes("hotel")) {
              const normalized = normalizeHotels(v);
              if (normalized.length >= 1) results.push(...normalized);
            }
            visit(v);
          });
        };
        visit(obj);
        return results;
      };

      const pickHotels = () => {
        const direct =
          normalizeHotels(data?.hotels) ||
          normalizeHotels(raw?.hotels) ||
          normalizeHotels(data?.hotelRecommendations) ||
          [];
        if (direct && direct.length) return direct;
        const deep = findHotelsDeep(raw);
        return deep && deep.length ? deep : [];
      };

      const normalizePlanItem = (p) => {
        const placeName = p?.placeName || p?.name || p?.title || p?.place || "";
        const placeDetails = p?.placeDetails || p?.description || p?.details || "";
        const ticketPricing = p?.ticketPricing || p?.price || p?.cost || "";
        const timeToTravel = p?.timeToTravel || p?.time || p?.slot || "";
        return {
          placeName: String(placeName),
          placeDetails: String(placeDetails),
          ticketPricing: typeof ticketPricing === "number" || typeof ticketPricing === "string" ? ticketPricing : "",
          timeToTravel: String(timeToTravel),
        };
      };

      const normalizeItinerary = (itineraryInput) => {
        if (!Array.isArray(itineraryInput)) return [];
        return itineraryInput.map((d, idx) => {
          const dayNumber = d?.day || d?.dayNumber || d?.dayIndex || idx + 1;
          const planRaw = d?.plan || d?.activities || d?.places || [];
          const plan = Array.isArray(planRaw) ? planRaw.map(normalizePlanItem) : [];
          return { day: dayNumber, plan };
        });
      };

      const findItineraryDeep = (obj) => {
        const candidates = [];
        const visit = (node) => {
          if (!node || typeof node !== "object") return;
          if (Array.isArray(node)) {
            // try as full itinerary
            const asItin = normalizeItinerary(node);
            if (asItin.length) candidates.push(...asItin);
            // or as a flat plan for a single day
            const asPlan = node.map(normalizePlanItem).filter(Boolean);
            if (asPlan.length) candidates.push({ day: candidates.length + 1, plan: asPlan });
            node.forEach(visit);
            return;
          }
          Object.entries(node).forEach(([k, v]) => {
            const key = String(k).toLowerCase();
            if (key.includes("itinerary") || key.includes("day") || key.includes("plan") || key.includes("places") || key.includes("activities")) {
              const asItin = normalizeItinerary(v);
              if (asItin.length) candidates.push(...asItin);
            }
            visit(v);
          });
        };
        visit(obj);
        return candidates;
      };

      const pickItinerary = () => {
        const direct =
          normalizeItinerary(data?.itinerary) ||
          normalizeItinerary(raw?.itinerary) ||
          normalizeItinerary(data?.days) ||
          [];
        if (direct && direct.length) return direct;
        const deep = findItineraryDeep(raw);
        return deep && deep.length ? deep : [];
      };

      const normalizedTrip = {
        hotels: pickHotels(),
        itinerary: pickItinerary(),
      };

      // Persist with a top-level `trip` key so the view reads trip.tripData.trip
      return { trip: normalizedTrip };
    } catch (e) {
      console.error("Failed to normalize AI trip data:", e);
      return { trip: { hotels: [], itinerary: [] } };
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      console.error("User email is missing. Cannot save trip.");
      toast("User not authenticated properly.");
      setLoading(false);
      return;
    }

    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AI-Trips", docId), {
        userSelection: formData,
        tripData: TripData, // normalized { trip: { hotels, itinerary } }
        userEmail: user.email,
        id: docId,
        createdAt: new Date().toISOString(),
      });

      toast("Trip saved successfully!");
      navigate("/view-trip/" + docId);
    } catch (err) {
      console.error("Error saving trip to Firestore:", err);
      toast("Failed to save trip. Try again.");
    }

    setLoading(false);
  };

  const GetUSerProfile = (accessToken) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        window.dispatchEvent(new Event('authChanged'));
        setOpenDialoge(false);
        OnGenerateTrip();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-15">
        <h1 className="font-bold text-3xl">Tell us your Travel Preferences 🏕️🌳</h1>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your Preferences.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2>
            <Input
              placeholder={"Enter Destination"}
              type="text"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-1 font-medium">How many days are you planning your trip?</h2>
            <Input
              placeholder={"Ex. 3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-10 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title ? "shadow-lg border-black" : ""}`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-10 font-medium">Select number of persons to travel</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.Peoples === item.people ? "shadow-lg border-black" : ""}`}
                onClick={() => handleInputChange("Peoples", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button disabled={Loading} onClick={OnGenerateTrip} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white">
            {Loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={opendialoge} onOpenChange={setOpenDialoge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.png" alt="Logo" className="h-16 w-auto mx-auto" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the app with Google authentication securely</p>

                <div onClick={login} className="p-4 border flex gap-3 mt-6 rounded-lg cursor-pointer hover:shadow-md items-center justify-center">
                  <FcGoogle className="text-2xl" />
                  <h2>Sign In With Google</h2>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </>
  );
}

export default CreateTrip;