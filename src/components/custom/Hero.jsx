import React from 'react'
import { Button } from '../ui/button'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] mt-16 text-center'> <span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineries tailored to your interests and budget</p>
        <Button className='px-[20px] py-[25px] text-xl cursor-pointer'>Get Started,It's Free</Button>
    </div>
  )
}

export default Hero