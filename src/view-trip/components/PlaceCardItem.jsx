import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaMapMarked } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
function PlaceCardItem({place}) {
    const reDirect= () => {
  window.open(`https://www.google.com/maps/search/?api=1&query=${place.placeName}`, '_blank');
};
  const [photo, setPhoto] = useState('');
  useEffect(()=>{
    const fetchPhoto = async()=>{
      try{
        if(!place?.placeName) return;
        const q = [place?.placeName].filter(Boolean).join(', ');
        const url = await getRelevantImageUrl(q,{width:100,height:100});
        setPhoto(url);
      }catch(err){
        setPhoto(buildSeededPhotoURL(place?.placeName,{width:100,height:100}));
      }
    };
    fetchPhoto();
  },[place?.placeName]);
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName } target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

        <img src={photo||'/image.png'} className='w-[100px] h-[100px] rounded-xl'
             onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = buildSeededPhotoURL(place?.placeName,{width:100,height:100}); }} />
        <div>
            <h2 className='font-bold text-large'>{place.placeName}</h2>
            <p className='text-sm text-gray-400  h-[80px] overflow-hidden'>{place.placeDetails}</p>
            <div className='flex gap-5 items-center '>
            <h2 className='text-green-500'> 💸 {place.ticketPricing}</h2>
            <Button className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white' onClick={reDirect}><FaMapMarked /></Button>
            </div>
        </div>
    </div>
  </Link>
)
}

export default PlaceCardItem