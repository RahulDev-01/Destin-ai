import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: (import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY || '').trim()
  });

  const tools = [
    {
      googleSearch: {} // You can add specific tool configurations here if needed
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1, // Optional, remove if not needed
    },
    tools,
    // Removed 'responseMimeType' as it caused issues
    systemInstruction: [
      {
        text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
      }
    ],
  };

  const model = 'gemini-2.5-pro';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Investigating Vegas Lodging**

I've started investigating budget-friendly hotels in Las Vegas for a couple, focusing on off-Strip options to save money. I'm leveraging Google to find suitable accommodations. Subsequently, I plan to delve deeper into each hotel, researching amenities and reviews.

**Gathering Vegas Details**

I'm now deep-diving into the initial hotel leads, pulling data like addresses, prices, and imagery from Google. Simultaneously, I'm researching free and cheap couple-friendly activities and cost-effective dining options to incorporate into the itinerary. Next, I'll structure a cost-conscious 3-day plan, taking location and time of day into account.

**Exploring Hotel Options**

I've initially identified a solid range of budget-friendly hotels in Las Vegas, suitable for couples. These include selections on and off the Strip, as well as Downtown. I have since compiled more data.

**Gathering Specific Hotel Data**

I've made headway on the hotel search. I've narrowed down a list of budget-friendly options, but I still need to find precise addresses, image URLs, and geo-coordinates. The current results give a good starting point, but I must make targeted searches to find this information. I also need to focus on those hotels that are both affordable and suited for a couple. After that, I will work on the itinerary and the final JSON format.`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`, // Replace with dynamic input if needed
        },
      ],
    },
  ];

  try {
    // Sending the request to the API without the responseMimeType
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fileIndex = 0;
    for await (const chunk of response) {
      console.log("Streamed Chunk: ", chunk.text);  // Log the streamed content
    }
  } catch (error) {
    console.error("Error generating trip plan:", error);
  }
}

main();
