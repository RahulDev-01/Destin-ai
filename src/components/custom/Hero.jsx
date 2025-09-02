import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import img from '../../../public/Main-Img.png'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] mt-16 text-center'> <span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineries tailored to your interests and budget</p>
        <Link to={'/create-trip'}>
        <Button className='px-[20px] py-[25px] text-xl cursor-pointer'>Get Started,It's Free</Button>
        </Link>
      <img src={img} alt="" />
    </div>
  )
}

export default Hero