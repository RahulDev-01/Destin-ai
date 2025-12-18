import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaMapMarked } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
function PlaceCardItem({ place }) {
  const reDirect = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${place.placeName}`, '_blank');
  };
  const [photo, setPhoto] = useState('');
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!place?.placeName) return;
        const q = [place?.placeName].filter(Boolean).join(', ');
        const url = await getRelevantImageUrl(q, { width: 100, height: 100 });
        setPhoto(url);
      } catch (err) {
        setPhoto(buildSeededPhotoURL(place?.placeName, { width: 100, height: 100 }));
      }
    };
    fetchPhoto();
  }, [place?.placeName]);
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
      <div className='group bg-white border border-gray-100 rounded-[2rem] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-all duration-700'></div>

        <div className='w-full sm:w-[130px] h-[180px] sm:h-[130px] rounded-[1.5rem] overflow-hidden flex-shrink-0 relative'>
          <img
            src={photo || '/image.png'}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = buildSeededPhotoURL(place?.placeName, { width: 200, height: 200 }); }}
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex items-start justify-between gap-2 mb-2'>
            <h2 className='font-black text-lg sm:text-xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors'>{place.placeName}</h2>
          </div>
          <p className='text-xs sm:text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 flex-1'>
            {place.placeDetails}
          </p>
          <div className='mt-auto flex items-center justify-between pt-3 border-t border-gray-50'>
            <div className='flex items-center gap-4'>
              <h2 className='text-sm font-black text-green-600 bg-green-50 px-3 py-1 rounded-full'>💸 {place.ticketPricing}</h2>
            </div>
            <Button
              className='h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-900 text-white hover:bg-blue-600 transform hover:rotate-12 transition-all shadow-lg'
              onClick={(e) => { e.preventDefault(); reDirect(); }}
            >
              <FaMapMarked className='text-lg' />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem