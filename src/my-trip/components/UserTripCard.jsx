import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';

function UserTripCard({ trip }) {
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(()=>{
    const fetchPhoto = async()=>{
      try{
        const q = trip?.userSelection?.location;
        if(!q) return;
        const url = await getRelevantImageUrl(q,{width:600,height:200});
        setCoverUrl(url);
      }catch(err){
        setCoverUrl(buildSeededPhotoURL(trip?.userSelection?.location,{width:600,height:200}));
      }
    };
    fetchPhoto();
  },[trip?.userSelection?.location]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='border rounded-xl hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer overflow-hidden'>
        <img
          src={coverUrl||'/image.png'}
          alt='cover'
          className='w-full h-[140px] object-cover'
          onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = buildSeededPhotoURL(trip?.userSelection?.location,{width:600,height:200}); }}
        />
        <div className='p-3 flex flex-col gap-2'>
          <h3 className='font-semibold text-lg truncate'>{trip?.userSelection?.location||'Trip'}</h3>
          <div className='flex flex-wrap gap-2 text-sm text-gray-600'>
            <span className='bg-gray-100 rounded-full px-2 py-1'>📅 {trip?.userSelection?.noOfDays} days</span>
            <span className='bg-gray-100 rounded-full px-2 py-1'>💰 {trip?.userSelection?.budget}</span>
            <span className='bg-gray-100 rounded-full px-2 py-1'>👥 {trip?.userSelection?.Peoples}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCard


