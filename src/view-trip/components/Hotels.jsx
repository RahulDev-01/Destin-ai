import React from 'react'
import { IoIosPin } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation</h2>
        <div className='grid grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.trip?.hotels?.map((hotel,index)=>{
                return(
                    <>
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName +','+hotel?.hotelAddress} target='_blank' >
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src="/image.png" alt="" className='rounded-lg'/>
                    <div className='my-2 flex flex-col gap-1'>
                        <h2 className='font-medium '>{hotel?.hotelName}</h2>
                        <h2 className=' text-sm text-gray-500 '>📍{hotel
                        ?.hotelAddress}</h2>
                        <h2 className=' text-sm md font-semibold'> 💰 {hotel?.price}</h2>
                        <h2 className=' text-sm '> ⭐ {hotel?.rating}   stars</h2>
                        
                    </div>
                </div>
                </Link>
                </>
                )
            })}
        </div>
    </div>
  )
}

export default Hotels