import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import img from '../../../public/hero.png'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] mt-16 text-center'> <span className='text-blue-500'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineries tailored to your interests and budget</p>
        <Link to={'/create-trip'}>
        <Button className='px-[20px] py-[25px] text-xl cursor-pointer bg-blue-500 hover:bg-blue-600 text-white'>Get Started,It's Free</Button>
        </Link>
      <img src={img} alt="" className='h-[600px]'/>
    </div>
  )
}

export default Hero