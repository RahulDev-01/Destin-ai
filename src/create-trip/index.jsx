import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SelectBudgetOptions } from "@/constants/options";
import { SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
function CreateTrip() {
  const [place,setPlace]=useState();
  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-15 ">
        <h1 className="font-bold text-3xl">Tell us your Travel Preferences</h1>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your Preferences.
        </p>
        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-1 font-medium">What is destination of choice?</h2>
            <GooglePlacesAutocomplete 
            apiKey="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"
            selectProps={
              {
              place,
              onChange:(v)=>{setPlace(v);console.log(v)}
            }
            }
            />
          </div>
          <div>
          <h2 className="text-xl my-1 font-medium">How many days are you planning your Trip</h2>
          <Input placeholder={'Ex.3'} type='number'/>
          </div>
        </div>
            <div>
              <h2 className="text-xl mt-10 font-medium">What is Your Budget?</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item,index)=>{
                  return(
                  <div key={index} className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h2 className="text-xl mt-10 font-medium">Select No Of Persons To Travel</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectTravelList.map((item,index)=>{
                  return(
                  <div key={index} className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                  )
                })}
              </div>
            </div>
            <div className="my-10 justify-end flex">
              <Button>Generate Trip</Button>
            </div>
      </div>
    </>
  );
}

export default CreateTrip;
