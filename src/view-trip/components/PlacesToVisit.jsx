import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-semibold text-3xl mt-8 mb-8">🚁 Places to Visit</h2>
      <div>
        {trip?.tripData?.trip?.itinerary?.map((item, index) => {
          return (
            <>
              <h2 className="font-medium text-2xl mt-4 mb-4 text-gray-600">📆 Day {item.day}</h2>
            <div key={index} className="grid md:grid-cols-2 gap-5 items-center  sm:grid-cols-1 ">
              {item.plan.map((place, index) => (
                <div className="my-3 h-">
                  <h2 className="font-medium text-sm text-orange-600">🕙 {place.timeToTravel}</h2>
                 <PlaceCardItem place={place}/>
                </div>
              ))}
            </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
