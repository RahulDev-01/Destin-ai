import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className='mt-16 sm:mt-24'>
      <div className='flex items-center gap-3 mb-10 px-2'>
        <div className='text-3xl sm:text-4xl'>🚁</div>
        <h2 className="font-black text-2xl sm:text-4xl text-gray-900 tracking-tight">Places to Visit</h2>
      </div>
      <div className='space-y-12'>
        {trip?.tripData?.trip?.itinerary?.map((item, index) => {
          return (
            <div key={`day-${item.day || index}`} className='space-y-6'>
              <div className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg'>
                <span className='text-xl'>📆</span>
                <h2 className="font-black text-lg sm:text-xl text-white uppercase tracking-widest">Day {item.day}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {item.plan.map((place, pIndex) => (
                  <div className="my-3 h-" key={`place-${place.placeName || pIndex}`}>
                    <h2 className="font-medium text-sm text-orange-600">🕙 {place.timeToTravel}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
