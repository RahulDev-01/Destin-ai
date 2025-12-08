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
    const model = "gemini-1.5-flash-001";
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
      if (error.message && (error.message.includes("429") || error.message.includes("Quota"))) {
        toast("API Quota exceeded. Please try again later or check billing.");
      } else {
        toast("There was an error generating your trip plan. Please try again.");
      }
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 mb-4">
              <span>🤖</span>
              <span>AI-Powered Trip Planning</span>
            </div>
            <h1 className="font-extrabold text-3xl sm:text-4xl mb-3 text-gray-900">
              Tell us your <span className='text-blue-600'>Travel Preferences</span> ✈️
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <div className="space-y-8">
                {/* Destination Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="text-2xl">📍</span>
                    What is your destination of choice?
                  </label>
                  <Input
                    placeholder="Enter Destination (e.g., Paris, Tokyo, New York)"
                    type="text"
                    className="h-11 text-base rounded-lg border-gray-300 focus:border-blue-500 transition-colors"
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>

                {/* Days Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="text-2xl">📅</span>
                    How many days are you planning your trip?
                  </label>
                  <Input
                    placeholder="Ex. 3 (Max: 20 days)"
                    type="number"
                    max="20"
                    className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                  />
                </div>

                {/* Budget Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="text-2xl">💰</span>
                    What is your budget?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SelectBudgetOptions.map((item, index) => (
                      <div
                        key={index}
                        className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${formData?.budget === item.title
                          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-blue-300"
                          }`}
                        onClick={() => handleInputChange("budget", item.title)}
                      >
                        <div className="text-center">
                          <div className="text-5xl mb-3">{item.icon}</div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        {formData?.budget === item.title && (
                          <div className="absolute top-3 right-3">
                            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travelers Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="text-2xl">👥</span>
                    Select number of persons to travel
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SelectTravelList.map((item, index) => (
                      <div
                        key={index}
                        className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${formData?.Peoples === item.people
                          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-blue-300"
                          }`}
                        onClick={() => handleInputChange("Peoples", item.people)}
                      >
                        <div className="text-center">
                          <div className="text-5xl mb-3">{item.icon}</div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        {formData?.Peoples === item.people && (
                          <div className="absolute top-3 right-3">
                            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-6">
                  <Button
                    disabled={Loading}
                    onClick={OnGenerateTrip}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {Loading ? (
                      <div className="flex items-center gap-3">
                        <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                        <span>Generating Your Perfect Trip...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Generate My Trip</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free to use
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Generated in seconds
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Fully customizable
              </span>
            </div>
          </div>
        </div>

        {/* Sign In Dialog */}
        <Dialog open={opendialoge} onOpenChange={setOpenDialoge}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogDescription>
                <div className="text-center">
                  <img src="/logo.png" alt="Logo" className="h-16 w-auto mx-auto mb-6" />
                  <h2 className="font-bold text-2xl mb-2 text-gray-900">Sign In to Continue</h2>
                  <p className="text-gray-600 mb-6">Sign in with Google to save and access your trips</p>

                  <div
                    onClick={login}
                    className="group p-4 border-2 border-gray-200 flex gap-3 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 items-center justify-center"
                  >
                    <FcGoogle className="text-3xl" />
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700">Sign In With Google</span>
                  </div>
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