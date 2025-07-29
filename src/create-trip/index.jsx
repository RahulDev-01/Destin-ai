// Importing necessary modules and components
import { Input } from "@/components/ui/input"; // Custom Input component
import React, { useEffect, useState } from "react"; // React and hooks
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options"; // Constants for prompts and options
import { Button } from "@/components/ui/button"; // Custom Button component
import { toast, Toaster } from "sonner"; // For toast notifications
import { GoogleGenAI } from "@google/genai"; // Gemini AI SDK
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"; // Dialog for Google Sign-In
import { FcGoogle } from "react-icons/fc"; // Google icon
import { useGoogleLogin } from "@react-oauth/google"; // Google OAuth login
import axios from "axios"; // HTTP client for Axios
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { db } from "@/service/firebaseConfig"; // Firebase config
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner icon

function CreateTrip() {
  // State to manage the Sign-In dialog visibility
  const [opendialoge, setOpenDialoge] = useState(false);

  // State for user's travel preference input
  const [formData, setFormData] = useState({
    location: "",           // Destination
    noOfDays: "",           // Number of days
    budget: "",             // Budget choice
    Peoples: "",            // Number of people
  });

  // State to track if the app is loading (eg. generating trip)
  const [Loading, setLoading] = useState(false);

  // Handles updates to the form data as the user answers questions
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Optional effect to help debug form values; logs whenever formData changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Sets up Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      const { access_token } = codeResp;
      GetUSerProfile(access_token); // Fetch profile on success
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Main function: Handles when "Generate Trip" is clicked
  const OnGenerateTrip = async () => {
    // 1. Check if user is logged in
    const user = localStorage.getItem("User");
    if (!user) {
      setOpenDialoge(true); // Open login dialog if not logged in
      return;
    }

    // 2. Check if form is fully filled out
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.Peoples) {
      toast("Please fill all details");
      return;
    }

    setLoading(true); // Show spinner/loading

    // 3. Prepare prompt for the AI using user input
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Peoples)
      .replace("{budget}", formData?.budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    // 4. Setup Gemini AI (Google AI) config
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY, // Using key from ENV
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

    let fullResponse = ""; // Accumulator for streamed AI reply

    try {
      // 5. Call Gemini AI and stream the response
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      // Append stream results to fullResponse
      for await (const chunk of response) {
        fullResponse += chunk.text || "";
        console.log("Streamed Chunk: ", chunk.text);
      }

      // 6. Save AI trip to Firestore after generating
      await SaveAiTrip(fullResponse);
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast("There was an error generating your trip plan.");
    }

    setLoading(false); // Hide spinner
  };

  // Saves the user's trip plan to Firestore database
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user?.email) {
      console.error("User email is missing. Cannot save trip.");
      toast("User not authenticated properly.");
      setLoading(false);
      return;
    }

    const docId = Date.now().toString(); // Unique ID for trip

    try {
      await setDoc(doc(db, "AI-Trips", docId), {
        userSelection: formData,         // The user's answers
        tripData: TripData,              // The AI-generated plan
        userEmail: user.email,           // Whose trip
        id: docId,                       // Document ID
      });
      toast("Trip saved successfully!");
    } catch (err) {
      console.error("Error saving trip to Firestore:", err);
      toast("Failed to save trip. Try again.");
    }

    setLoading(false);
  };

  // Gets the user's Google profile after sign in, saves it, and proceeds to trip generation
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
        localStorage.setItem("UserProfile", JSON.stringify(resp.data));
        localStorage.setItem("User", JSON.stringify(resp.data));
        setOpenDialoge(false); // Close dialog
        OnGenerateTrip(); // Now create trip
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-15">
        {/* App Headings */}
        <h1 className="font-bold text-3xl">Tell us your Travel Preferences 🏕️🌳</h1>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your Preferences.
        </p>

        {/* Destination Input */}
        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2>
            <Input
              placeholder={"Enter Destination"}
              type="text"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          {/* Trip Duration Input */}
          <div>
            <h2 className="text-xl my-1 font-medium">How many days are you planning your trip?</h2>
            <Input
              placeholder={"Ex. 3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        {/* Select Budget */}
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

        {/* Select Number of People */}
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

        {/* Generate Trip Button */}
        <div className="my-10 justify-end flex">
          <Button disabled={Loading} onClick={OnGenerateTrip} className="cursor-pointer">
            {Loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        {/* Google Sign In Dialog, shows if not logged in */}
        <Dialog open={opendialoge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="Logo" />
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

      {/* Notification system */}
      <Toaster />
    </>
  );
}

export default CreateTrip;
