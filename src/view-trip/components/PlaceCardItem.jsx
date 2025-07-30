import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import React from 'react'
import { FaMapMarked } from "react-icons/fa";
import { Link } from 'react-router-dom';
function PlaceCardItem({place}) {
    const reDirect= () => {
  window.open(`https://www.google.com/maps/search/?api=1&query=${place.placeName}`, '_blank');
};
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName } target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

        <img src='/image.png' className='w-[100px] h-[100px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-large'>{place.placeName}</h2>
            <p className='text-sm text-gray-400  h-[80px] overflow-hidden'>{place.placeDetails}</p>
            <div className='flex gap-5 items-center '>
            <h2 className='text-green-500'> 💸 {place.ticketPricing}</h2>
            <Button className='cursor-pointer' onClick={reDirect}><FaMapMarked /></Button>
            </div>
        </div>
    </div>
  </Link>
)
}

export default PlaceCardItem