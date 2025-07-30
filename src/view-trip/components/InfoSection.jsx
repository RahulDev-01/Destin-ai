import { Button } from '@/components/ui/button'
import React from 'react'
import { FaShareAlt } from "react-icons/fa";

export default function InfoSection({trip}) {
  return (
    <div>
        <img src="/image.png" alt="" className='h-[300px] w-full object-cover rounded-xl' />
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
