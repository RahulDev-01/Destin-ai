import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SelectBudgetOptions } from "@/constants/options";
import { SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
function CreateTrip() {
  const [place,setPlace]=useState();
  const [formData,setFormData] =useState()

  const handleInputChange =(name,value)=>{
    
    setFormData({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData)
  },[formData])

  const OnGenerateTrip=()=>{
    if(formData?.noOfDays>15)
    {
      return;
    }
    console.log(formData);
    
  }
  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-15 ">
        <h1 className="font-bold text-3xl">Tell us your Travel Preferences 🏕️🌳</h1>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your Preferences.
        </p>
        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-1 font-medium">What is destination of choice?</h2>
             <Input placeholder={'Enter Destination'} type='character'onChange={(e)=>{handleInputChange('Destination :',e.target.value)}}
             />
          </div>
          <div>
          <h2 className="text-xl my-1 font-medium">How many days are you planning your Trip</h2>
          <Input placeholder={'Ex.3'} type='number'
          onChange={(e)=>{handleInputChange('noOfDays',e.target.value)}}
          />
          </div>
        </div>
            <div>
              <h2 className="text-xl mt-10 font-medium">What is Your Budget?</h2>
              <div className={`grid grid-cols-3 gap-5 mt-5 `}>
                {SelectBudgetOptions.map((item,index)=>{
                  return(
                  <div key={index} className={` p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget==item.title&&'shadow-lg border-black' }`} 
                  onClick={()=>handleInputChange('budget',item.title)}
                  >
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
                  <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.Peoples==item.people&&'shadow-lg border-black' }`}
                  onClick={()=>handleInputChange('Peoples',item.people)}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                  )
                })}
              </div>
            </div>
            <div className="my-10 justify-end flex">
              <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
      </div>
    </>
  );
}

export default CreateTrip;
