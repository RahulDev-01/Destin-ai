import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='relative w-full overflow-hidden bg-animated-gradient min-h-[90vh] flex items-center'>
      {/* Animated Background Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-cyan-900/20'></div>

      {/* Floating Orbs */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      <div className='absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000'></div>
      <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000'></div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-12 md:py-16 lg:py-20'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-8 z-10'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm font-medium text-white shadow-lg'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-white'></span>
              </span>
              <span>AI-Powered Travel Planning</span>
              <span className='hidden sm:inline'>• Plan smarter, travel better</span>
            </div>

            {/* Main Heading */}
            <h1 className='font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'>
              <span className='gradient-text block mb-2'>Discover Your Next</span>
              <span className='text-white drop-shadow-lg'>Adventure with AI</span>
            </h1>

            {/* Description */}
            <p className='text-lg sm:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
              Your personal trip planner and travel curator. Get custom itineraries tailored to your interests, time, and budget in seconds.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start'>
              <Link to={'/create-trip'}>
                <Button className='h-14 px-8 text-lg bg-white text-blue-600 hover:bg-white/90 font-semibold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105'>
                  Get Started — It's Free
                  <svg className='ml-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </Button>
              </Link>
              <Link to={'/create-trip'}>
                <Button variant='outline' className='h-14 px-8 text-lg glass-strong text-white border-white/30 hover:bg-white/20 font-semibold rounded-full transition-all duration-300 hover:scale-105'>
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className='mx-auto lg:mx-0 w-full max-w-xl'>
              <div className='glass-strong rounded-2xl p-2 shadow-2xl ring-1 ring-white/20 hover:ring-white/40 transition-all duration-300'>
                <div className='flex items-center gap-3 p-3 rounded-xl'>
                  <svg className='h-6 w-6 text-white/70' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z' />
                  </svg>
                  <input
                    type='text'
                    placeholder='Try "5 days in Bali on a budget"'
                    className='flex-1 bg-transparent outline-none placeholder:text-white/50 text-white'
                    disabled
                  />
                  <Link to={'/create-trip'}>
                    <Button className='bg-white text-blue-600 hover:bg-white/90 font-semibold rounded-xl px-6 shadow-lg'>
                      Plan
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/80'>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                No credit card required
              </span>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                </svg>
                Plan in under a minute
              </span>
              <span className='flex items-center gap-2'>
                <svg className='h-5 w-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                </svg>
                Edit anytime
              </span>
            </div>

            {/* Social Proof */}
            <div className='flex items-center justify-center lg:justify-start gap-4 pt-4'>
              <div className='flex -space-x-3'>
                <img src='https://i.pravatar.cc/40?img=1' alt='User' className='w-10 h-10 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=2' alt='User' className='w-10 h-10 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=3' alt='User' className='w-10 h-10 rounded-full ring-2 ring-white' />
                <img src='https://i.pravatar.cc/40?img=4' alt='User' className='w-10 h-10 rounded-full ring-2 ring-white' />
              </div>
              <div className='text-white/90'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='h-4 w-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0L7.105 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.47 8.72c-.783-.57-.38-1.81.588-1.81H7.52a1 1 0 00.95-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <p className='text-sm font-medium'>Trusted by 5,000+ travelers</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Images */}
          <div className='relative w-full h-[500px] lg:h-[600px] z-10'>
            {/* Main Image - Traveler with AI */}
            <div className='absolute top-0 right-0 w-[70%] h-[70%] float'>
              <div className='relative w-full h-full glass rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-500'>
                <img
                  src='/hero-traveler.png'
                  alt='AI Travel Planning Interface'
                  className='w-full h-full object-cover'
                  loading='eager'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent'></div>
              </div>
            </div>

            {/* Secondary Image - Destinations */}
            <div className='absolute bottom-0 left-0 w-[70%] h-[70%] float-delayed'>
              <div className='relative w-full h-full glass rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-500'>
                <img
                  src='/hero-destinations.png'
                  alt='Travel Destinations'
                  className='w-full h-full object-cover'
                  loading='eager'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent'></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-1/4 left-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-30 blur-2xl animate-pulse'></div>
            <div className='absolute bottom-1/4 right-1/4 w-16 h-16 bg-pink-400 rounded-full opacity-30 blur-2xl animate-pulse delay-1000'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero