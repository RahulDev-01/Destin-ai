import { Button } from '@/components/ui/button'
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
import React, { useEffect, useMemo, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";

export default function InfoSection({ trip }) {
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!trip?.userSelection?.location) return;
        const url = await getRelevantImageUrl(trip?.userSelection?.location, { width: 1200, height: 300 });
        setCoverUrl(url);
      } catch (err) {
        setCoverUrl(buildSeededPhotoURL(trip?.userSelection?.location, { width: 1200, height: 300 }));
      }
    };
    fetchPhoto();
  }, [trip?.userSelection?.location]);
  return (
    <div className='space-y-6'>
      <div className='relative group overflow-hidden rounded-[2rem] shadow-2xl'>
        <img
          src={coverUrl || "/image.png"}
          alt=""
          className='h-[200px] sm:h-[350px] md:h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105'
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = buildSeededPhotoURL(trip?.userSelection?.location, { width: 1200, height: 400 }); }}
        />
        <div className='absolute inset-0 bg-black/50 opacity-60'></div>
      </div>

      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 px-2'>
        <div className='space-y-4'>

          <h2 className='font-black text-3xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight leading-none'>
            {trip?.userSelection?.location}
          </h2>
          <div className='flex flex-wrap gap-3 mt-4'>
            <div className='flex items-center gap-2 p-2 px-4 bg-gray-100/80 backdrop-blur-sm rounded-2xl text-gray-600 text-xs sm:text-sm font-black border border-gray-200 hover:bg-white hover:shadow-md transition-all'>
              <span className='font-semibold'>Days:</span> {trip?.userSelection?.noOfDays} Days
            </div>
            <div className='flex items-center gap-2 p-2 px-4 bg-gray-100/80 backdrop-blur-sm rounded-2xl text-gray-600 text-xs sm:text-sm font-black border border-gray-200 hover:bg-white hover:shadow-md transition-all'>
              <span className='font-semibold'>Budget:</span> {trip?.userSelection?.budget} Budget
            </div>
            <div className='flex items-center gap-2 p-2 px-4 bg-gray-100/80 backdrop-blur-sm rounded-2xl text-gray-600 text-xs sm:text-sm font-black border border-gray-200 hover:bg-white hover:shadow-md transition-all'>
              <span className='font-semibold'>Travelers:</span> {trip?.userSelection?.Peoples} Travelers
            </div>
          </div>
        </div>
        <Button className='h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 active:scale-95 transition-all'>
          <FaShareAlt className='text-xl sm:text-2xl' />
        </Button>
      </div>
    </div>
  )
}
