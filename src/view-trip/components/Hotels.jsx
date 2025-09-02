import React, { useEffect, useState } from 'react'
import { IoIosPin } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';

function Hotels({trip}) {
  const [photos, setPhotos] = useState({});

  useEffect(()=>{
    const load = async()=>{
      const list = trip?.tripData?.trip?.hotels?.slice(0,4) || [];
      const out = {};
      for (let i=0;i<list.length;i++){
        const h = list[i];
        const q = [h?.hotelName, h?.hotelAddress].filter(Boolean).join(', ');
        try{
          out[h?.hotelName||i] = await getRelevantImageUrl(q,{width:400,height:300});
        }catch{
          out[h?.hotelName||i] = buildSeededPhotoURL(q||('hotel-'+(i+1)),{width:400,height:300});
        }
      }
      setPhotos(out);
    };
    load();
  },[trip?.tripData?.trip?.hotels]);
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation</h2>
        <div className='grid grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.trip?.hotels?.slice(0,4).map((hotel,index)=>{
                return(
                    <div key={hotel?.hotelName+index}>
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName +','+hotel?.hotelAddress} target='_blank' >
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img
                      src={photos[hotel?.hotelName||index]||buildSeededPhotoURL(hotel?.hotelName||('hotel-'+(index+1)),{width:400,height:300})}
                      alt=""
                      className='rounded-lg'
                      onError={(e)=>{ const img=e.currentTarget; img.onerror=null; img.src = buildSeededPhotoURL(hotel?.hotelName||('hotel-'+(index+1)),{width:400,height:300}); }}
                    />
                    <div className='my-2 flex flex-col gap-1'>
                        <h2 className='font-medium '>{hotel?.hotelName}</h2>
                        <h2 className=' text-sm text-gray-500 '>📍{hotel
                        ?.hotelAddress}</h2>
                        <h2 className=' text-sm md font-semibold'> 💰 {hotel?.price}</h2>
                        <h2 className=' text-sm '> ⭐ {hotel?.rating}   stars</h2>
                        
                    </div>
                </div>
                </Link>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Hotels