import React, { useEffect, useState } from 'react'
import { IoIosPin } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
import { formatPrice } from '../../lib/currency';

function Hotels({ trip, currency }) {
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
        <div className='text-3xl sm:text-4xl font-black text-blue-700'>Hotels</div>
        <h2 className='font-black text-2xl sm:text-4xl text-gray-900 tracking-tight'>Hotel Recommendations</h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
        {trip?.tripData?.trip?.hotels?.slice(0, 4).map((hotel, index) => {
          return (
            <div key={hotel?.hotelName + index}>
              <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank' >
                <div className='group bg-white rounded-2xl sm:rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden'>
                  {/* Image with rating overlay */}
                  <div className='relative overflow-hidden aspect-[4/3]'>
                    <img
                      src={photos[hotel?.hotelName || index] || buildSeededPhotoURL(hotel?.hotelName || ('hotel-' + (index + 1)), { width: 400, height: 300 })}
                      alt=""
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                      onError={(e) => { const img = e.currentTarget; img.onerror = null; img.src = buildSeededPhotoURL(hotel?.hotelName || ('hotel-' + (index + 1)), { width: 400, height: 300 }); }}
                    />
                    {/* Rating badge on image */}
                    <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-lg'>
                      <span className='text-sm'>⭐</span>
                      <span className='text-sm font-black text-gray-900'>{hotel?.rating}</span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className='flex-1 flex flex-col gap-1.5 p-4 sm:p-5'>
                    <h2 className='font-black text-base sm:text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors'>
                      {hotel?.hotelName}
                    </h2>
                    <p className='text-[11px] sm:text-xs text-gray-400 font-medium flex items-start gap-1.5 leading-snug'>
                      <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{hotel?.hotelAddress}</span>
                    </p>

                    {/* Price */}
                    <div className='mt-auto pt-3 border-t border-gray-100'>
                      <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>Per Night</span>
                      <p className='text-sm font-black text-green-600 leading-snug mt-0.5'>{formatPrice(hotel?.price, currency)}</p>
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