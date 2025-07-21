import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { GoogleGenAI } from "@google/genai"; // Ensure this is imported correctly

function CreateTrip() {
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
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    // Check if all fields are filled
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.Peoples) {
      toast("Please fill all details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Peoples)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("Final Prompt:", FINAL_PROMPT);

    // Instantiate the GoogleGenAI class with the API key
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
    });

    // Define tools, config, and model as per Google Gemini's API
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
          text: FINAL_PROMPT, // Send the final prompt generated
        },
      ],
    };

    const model = "gemini-2.5-pro"; // Ensure this model is correct for your use case

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
      // Correctly call the `generateContentStream` function
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      // Handle the stream and log the response
      let fileIndex = 0;
      for await (const chunk of response) {
        console.log("Streamed Chunk: ", chunk.text);  // Log the response chunk text
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast("There was an error generating your trip plan.");
    }
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
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title ? "shadow-lg border-black" : ""
                }`}
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
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.Peoples === item.people ? "shadow-lg border-black" : ""
                }`}
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
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </>
  );
}

export default CreateTrip;
