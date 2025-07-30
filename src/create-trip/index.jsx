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
    const user = localStorage.getItem("User");
    if (!user) {
      setOpenDialoge(true);
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.Peoples) {
      toast("Please fill all details");
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

      // Extract JSON from response
      const match = fullResponse.match(/```json([\s\S]*?)```/);
      const jsonText = match ? match[1].trim() : null;

      if (!jsonText) {
        toast("Failed to extract trip data from AI response.");
        console.error("No JSON block found in AI response.");
        setLoading(false);
        return;
      }

      const parsedTrip = JSON.parse(jsonText);
      await SaveAiTrip(parsedTrip); // Save structured data
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast("There was an error generating your trip plan.");
    }

    setLoading(false);
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("User"));
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
        tripData: TripData, // now saved as JSON object
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
        localStorage.setItem("UserProfile", JSON.stringify(resp.data));
        localStorage.setItem("User", JSON.stringify(resp.data));
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
          <Button disabled={Loading} onClick={OnGenerateTrip} className="cursor-pointer">
            {Loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={opendialoge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="Logo" />
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
