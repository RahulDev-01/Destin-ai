import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='flex flex-col-reverse items-center gap-10 py-12 md:py-16 lg:grid lg:grid-cols-2 lg:gap-14 lg:py-20'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left'>
            <div className='inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700'>
              <span>AI Travel Planner</span>
              <span className='hidden sm:inline text-blue-500'>• Plan smarter, travel better</span>
            </div>

            <h1 className='mt-5 font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl'>
              <span className='text-blue-600'>Discover your next adventure</span> with personalized AI itineraries
            </h1>
            <p className='mt-5 text-lg sm:text-xl text-gray-600'>
              Your personal trip planner and travel curator. Get custom itineraries tailored to your interests, time, and budget in seconds.
            </p>

            <div className='mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start'>
              <Link to={'/create-trip'}>
                <Button className='h-12 px-6 text-base bg-blue-600 hover:bg-blue-700 text-white'>
                  Get Started — It’s Free
                </Button>
              </Link>
            </div>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500 lg:justify-start'>
              <span>• No credit card required</span>
              <span>• Plan in under a minute</span>
              <span>• Edit anytime</span>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className='relative w-full'>
            {/* Use public folder image reference */}
            <img
              src='/hero.png'
              alt='Illustration of a traveler planning an itinerary with AI'
              className='mx-auto max-h-[520px] w-full max-w-[720px] object-contain drop-shadow-xl'
              loading='eager'
              decoding='async'
            />
            <div className='pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-blue-100/60 via-sky-100/40 to-indigo-100/40 blur-2xl'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero