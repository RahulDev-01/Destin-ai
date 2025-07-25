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

function CreateTrip() {
  const [opendialoge, setOpenDialoge] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    Peoples: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);  // Logging in the browser is fine
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      const { access_token } = codeResp;  // Extract access_token from codeResp
      GetUSerProfile(access_token);  // Pass the access token to GetUSerProfile
    },
    onError: (error) => {
      console.log(error);  // Handle login error
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('User');
    if (!user) {
      setOpenDialoge(true);  // Show the dialog if user is not logged in
      return;
    }

    // Check if all fields are filled
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.Peoples) {
      toast("Please fill all details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Peoples)
      .replace("{budget}", formData?.budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
    });

    const tools = [
      {
        googleSearch: {},
      },
    ];

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
      systemInstruction: [
        {
          text: FINAL_PROMPT,
        },
      ],
    };

    const model = "gemini-2.5-pro";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: FINAL_PROMPT,
          },
        ],
      },
    ];

    try {
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let fileIndex = 0;
      for await (const chunk of response) {
        console.log("Streamed Chunk: ", chunk.text);
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast("There was an error generating your trip plan.");
    }
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
        console.log("User Profile:", resp.data);
        // Save the user profile to localStorage
        localStorage.setItem("UserProfile", JSON.stringify(resp.data));
        localStorage.setItem("User", JSON.stringify(resp.data));  // Ensure 'User' is set here

        setOpenDialoge(false);  // Close the dialog after fetching the user profile
        OnGenerateTrip();  // Call OnGenerateTrip after the profile is fetched and user is logged in
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
          <Button onClick={OnGenerateTrip} className="cursor-pointer">
            Generate Trip
          </Button>
        </div>

        {/* Google Sign In Dialog */}
        <Dialog open={opendialoge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the app with Google authentication securely</p>
                <Button onClick={login} className="w-full mt-5 cursor-pointer flex gap-2 items-center">
                  <FcGoogle className="h-7 w-7" />Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </>
  );
}

export default CreateTrip;
