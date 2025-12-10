import React, { useEffect, useState } from "react";
// Using direct fetch instead of SDK to avoid v1beta 404 errors
import { toast, Toaster } from "sonner";
import { AI_PROMPT } from "@/constants/options";
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
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/lib/seo";

// Wizard Components
import StepIndicator from "./components/StepIndicator";
import DestinationStep from "./components/DestinationStep";
import DurationStep from "./components/DurationStep";
import BudgetStyleStep from "./components/BudgetStyleStep";
import TravelersStep from "./components/TravelersStep";
import ReviewStep from "./components/ReviewStep";

function CreateTrip() {
  const [currentStep, setCurrentStep] = useState(1);
  const [opendialoge, setOpenDialoge] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    Peoples: "",
  });
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // SEO
  useSEO({
    title: "Create Trip | Destin AI",
    description: "Tell us your travel preferences and let Destin AI generate a personalized itinerary in seconds.",
    image: "/hero.png",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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

    if (parseInt(formData.noOfDays, 10) > 20) {
      toast("You cannot proceed with more than 20 days.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Peoples)
      .replace("{budget}", formData?.budget);

    // console.log("Final Prompt:", FINAL_PROMPT);

    // Using v1 stable API endpoint directly to avoid v1beta compatibility issues
    const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
    const model = "gemini-pro"; // Most widely available model
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;

    let fullResponse = "";

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: FINAL_PROMPT
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      // Extract text from response
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        fullResponse = data.candidates[0].content.parts.map(part => part.text).join('');
        console.log('Successfully generated with gemini-pro via v1 API');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('Failed to generate trip. Please check your API key and try again.');
      setLoading(false);
      return;
    }

    try {
      const parsedTrip = parseAiJson(fullResponse);
      if (!parsedTrip) {
        toast("Failed to extract trip data from AI response.");
        console.error("Could not parse AI response into JSON.", fullResponse);
        setLoading(false);
        return;
      }
      const normalized = normalizeTripData(parsedTrip);
      await SaveAiTrip(normalized);
    } catch (error) {
      console.error("Error processing trip data:", error);
      toast("Error processing trip data.");
    }

    setLoading(false);
  };

  const parseAiJson = (text) => {
    if (!text) return null;
    const clean = (s) => s.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

    const candidates = [];
    const fenceJson = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (fenceJson && fenceJson[1]) candidates.push(clean(fenceJson[1]));
    const fenceAny = text.match(/```\s*([\s\S]*?)\s*```/);
    if (fenceAny && fenceAny[1]) candidates.push(clean(fenceAny[1]));
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      candidates.push(clean(text.substring(firstBrace, lastBrace + 1)));
    }
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
            const asItin = normalizeItinerary(node);
            if (asItin.length) candidates.push(...asItin);
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
        tripData: TripData,
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
      <div className="min-h-screen bg-gray-50/50 py-12 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Progress */}
          <StepIndicator currentStep={currentStep} totalSteps={5} />

          {/* Form Content */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 min-h-[500px]">
            {currentStep === 1 && (
              <DestinationStep
                formData={formData}
                handleInputChange={handleInputChange}
                onNext={nextStep}
              />
            )}

            {currentStep === 2 && (
              <DurationStep
                formData={formData}
                handleInputChange={handleInputChange}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep === 3 && (
              <BudgetStyleStep
                formData={formData}
                handleInputChange={handleInputChange}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep === 4 && (
              <TravelersStep
                formData={formData}
                handleInputChange={handleInputChange}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep === 5 && (
              <ReviewStep
                formData={formData}
                onGenerate={OnGenerateTrip}
                onBack={prevStep}
                loading={Loading}
              />
            )}
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