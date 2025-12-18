import React, { useEffect, useState } from 'react'
import { IoIosPin } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';

function Hotels({ trip }) {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const load = async () => {
      const list = trip?.tripData?.trip?.hotels?.slice(0, 4) || [];
      const out = {};
      for (let i = 0; i < list.length; i++) {
        const h = list[i];
        const q = [h?.hotelName, h?.hotelAddress].filter(Boolean).join(', ');
        try {
          out[h?.hotelName || i] = await getRelevantImageUrl(q, { width: 400, height: 300 });
        } catch {
          out[h?.hotelName || i] = buildSeededPhotoURL(q || ('hotel-' + (i + 1)), { width: 400, height: 300 });
        }
      }
      setPhotos(out);
    };
    load();
  }, [trip?.tripData?.trip?.hotels]);
  return (
    <div className='mt-12 sm:mt-16'>
      <div className='flex items-center gap-3 mb-8 px-2'>
        <div className='text-3xl sm:text-4xl'>🏨</div>
        <h2 className='font-black text-2xl sm:text-4xl text-gray-900 tracking-tight'>Hotel Recommendations</h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
        {trip?.tripData?.trip?.hotels?.slice(0, 4).map((hotel, index) => {
          return (
            <div key={hotel?.hotelName + index}>
              <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank' >
                <div className='group bg-white rounded-[2rem] p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col'>
                  <div className='overflow-hidden rounded-2xl aspect-[4/3] mb-4'>
                    <img
                      src={photos[hotel?.hotelName || index] || buildSeededPhotoURL(hotel?.hotelName || ('hotel-' + (index + 1)), { width: 400, height: 300 })}
                      alt=""
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                      onError={(e) => { const img = e.currentTarget; img.onerror = null; img.src = buildSeededPhotoURL(hotel?.hotelName || ('hotel-' + (index + 1)), { width: 400, height: 300 }); }}
                    />
                  </div>
                  <div className='flex-1 flex flex-col gap-2 px-2'>
                    <h2 className='font-black text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500 font-medium flex items-center gap-1 mb-2'>
                      <span>📍</span> {hotel?.hotelAddress}
                    </h2>
                    <div className='mt-auto pt-2 flex items-center justify-between border-t border-gray-50'>
                      <h2 className='text-sm font-black text-green-600 bg-green-50 px-3 py-1 rounded-full'>💸 {hotel?.price}</h2>
                      <h2 className='text-sm font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1'>
                        <span>⭐</span> {hotel?.rating}
                      </h2>
                    </div>
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