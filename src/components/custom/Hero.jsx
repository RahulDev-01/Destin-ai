import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-24'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-6'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700'>
              <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
              <span>AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <h1 className='font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl text-gray-900'>
              Plan Your Perfect Trip with <span className='text-blue-600'>AI Assistance</span>
            </h1>

            {/* Description */}
            <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0'>
              Get personalized itineraries tailored to your interests, budget, and schedule in seconds. Professional travel planning made simple.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4'>
              <Link to={'/create-trip'}>
                <Button className='h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200'>
                  Get Started Free
                  <svg className='ml-2 h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </Button>
              </Link>
              <Link to={'/create-trip'}>
                <Button variant='outline' className='h-12 px-8 text-base border-gray-300 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200'>
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 pt-6'>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                No credit card required
              </span>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                </svg>
                Ready in 60 seconds
              </span>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                </svg>
                Fully customizable
              </span>
            </div>

            {/* Social Proof */}
            <div className='flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-gray-200 mt-8'>
              <div className='flex -space-x-2'>
                <img src='https://i.pravatar.cc/40?img=1' alt='User' className='w-8 h-8 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=2' alt='User' className='w-8 h-8 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=3' alt='User' className='w-8 h-8 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=4' alt='User' className='w-8 h-8 rounded-full ring-2 ring-white' />
              </div>
              <div className='text-sm text-gray-700'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='h-4 w-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0L7.105 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.47 8.72c-.783-.57-.38-1.81.588-1.81H7.52a1 1 0 00.95-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <p className='font-medium'>Trusted by 5,000+ travelers</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className='relative w-full'>
            <div className='relative rounded-2xl overflow-hidden shadow-xl'>
              <img
                src='/hero-traveler.png'
                alt='AI Travel Planning Interface'
                className='w-full h-auto object-cover'
                loading='eager'
              />
            </div>
            {/* Subtle accent */}
            <div className='absolute -bottom-4 -right-4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero