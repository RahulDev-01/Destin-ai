export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:"Stay conscious of costs",
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:"Keep cost on the average side",
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💎',
    },
]

export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:"A sole traveles",
        icon:'🙋🏾‍♀️',
        people:'1',
    },
    {
        id:2,
        title:'A couple',
        desc:"Two travelers",
        icon:'👫🏾',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:"A group of fun loving adv",
        icon:'🏡',
        people:'3 to 5 people',
    },
    {
        id:4,
        title:'Friends',
        desc:"A bunch of thrill-seekers",
        icon:'👩‍👩‍👦‍👦',
        people:'5 to 12 people',
    },
]


export const AI_PROMPT='Generate a travel plan for location: {location}, for {totalDays} days, for {traveler} travelers, with a {budget} budget. STRICTLY follow this output contract: Respond ONLY with a fenced JSON block (```json ... ```). The JSON must match EXACTLY this schema and field names (no extra keys, no renaming, no commentary): {"trip": {"hotels": [{"hotelName": "string", "hotelAddress": "string", "price": "string or number", "rating": "string or number"}], "itinerary": [{"day": number, "plan": [{"placeName": "string", "placeDetails": "string", "ticketPricing": "string or number", "timeToTravel": "string"}]}]}}. Requirements: 1) Use the exact keys: hotelName, hotelAddress, price, rating, day, plan, placeName, placeDetails, ticketPricing, timeToTravel. 2) Provide {totalDays} itinerary days (1-index day numbering). 3) Provide between 4 and 8 hotel options under trip.hotels (prefer 4–6). 4) Ensure arrays are present even if empty; avoid undefined/null. 5) Do NOT include markdown or text outside the single ```json block.'


