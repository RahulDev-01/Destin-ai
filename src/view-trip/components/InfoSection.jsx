import { Button } from '@/components/ui/button'
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
import React, { useEffect, useMemo, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";

export default function InfoSection({trip}) {
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(()=>{
    const fetchPhoto = async () => {
      try{
        if(!trip?.userSelection?.location) return;
        const url = await getRelevantImageUrl(trip?.userSelection?.location,{width:1200,height:300});
        setCoverUrl(url);
      }catch(err){
        setCoverUrl(buildSeededPhotoURL(trip?.userSelection?.location,{width:1200,height:300}));
      }
    };
    fetchPhoto();
  },[trip?.userSelection?.location]);
  return (
    <div>
        <img src={coverUrl||"/image.png"} alt="" className='h-[300px] w-full object-cover rounded-xl'
             onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = buildSeededPhotoURL(trip?.userSelection?.location,{width:1200,height:300}); }} />
        <div className='flex items-center justify-between'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
            <div className='flex gap-5 mt-2'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md font-semibold'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md font-semibold'> 💰 {trip?.userSelection?.budget}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md font-semibold'>✈️ No of Travelers  {trip?.userSelection?.Peoples}</h2>
            </div>
        </div>
        <Button className='mt-6 cursor-pointer'><FaShareAlt /></Button>
        </div>
    </div>
  )
}
