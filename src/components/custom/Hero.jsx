import React, { Suspense, lazy } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

// Lazy load the Globe component for better performance
const GlobeComponent = lazy(() => import('./GlobeComponent'))

function Hero() {
  return (
    <section className='relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 md:py-32'>
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-8 z-10'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default'>
              <span className="text-xl animate-bounce">✨</span>
              <span>AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <h1 className='font-black leading-tight text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 tracking-tight animate-fade-in'>
              Plan Your Dream Trip in Seconds
            </h1>

            {/* Description */}
            <p className='text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium'>
              Let AI create <span className='text-purple-600 font-bold'>personalized itineraries</span> tailored to your style, budget, and interests. No more endless research! 🎯
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4'>
              <Link to={'/create-trip'}>
                <Button className='group h-16 px-10 text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300'>
                  <span className='mr-2'>🚀</span>
                  Start Planning Free
                  <span className='ml-2 group-hover:translate-x-1 transition-transform'>→</span>
                </Button>
              </Link>
              <Link to={'/create-trip'}>
                <Button variant='outline' className='h-16 px-10 text-xl border-3 border-purple-600 hover:bg-purple-50 text-purple-700 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105'>
                  <span className="mr-2">▶️</span>
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className='flex items-center justify-center lg:justify-start gap-8 pt-8'>
              <div className='flex -space-x-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt='Happy traveler'
                    className='w-14 h-14 rounded-full border-4 border-white ring-2 ring-purple-200 shadow-lg hover:scale-110 transition-transform duration-300'
                  />
                ))}
              </div>
              <div className='text-left'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='font-black text-2xl text-purple-600'>4.9</span>
                  <div className="flex text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className='text-gray-600 font-semibold'>from <span className='text-purple-600 font-bold'>50,000+</span> travelers</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6'>
              <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md'>
                <span className='text-2xl'>⚡</span>
                <span className='font-bold text-gray-700'>Instant Results</span>
              </div>
              <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md'>
                <span className='text-2xl'>🔒</span>
                <span className='font-bold text-gray-700'>100% Free</span>
              </div>
              <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md'>
                <span className='text-2xl'>🌍</span>
                <span className='font-bold text-gray-700'>Global Coverage</span>
              </div>
            </div>
          </div>

          {/* Right: 3D Globe */}
          <div className='relative w-full z-10 flex items-center justify-center'>
            <div className='relative'>
              <Suspense fallback={
                <div className='w-[600px] h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-full'>
                  <div className='text-center'>
                    <div className='text-6xl mb-4 animate-spin'>🌍</div>
                    <p className='text-xl font-bold text-purple-600'>Loading Globe...</p>
                  </div>
                </div>
              }>
                <div className='transform hover:scale-105 transition-all duration-500'>
                  <GlobeComponent />
                </div>
              </Suspense>

              {/* Floating Stats Cards */}
              <div className='absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float z-20'>
                <div className='flex items-center gap-3'>
                  <div className='text-3xl'>🎉</div>
                  <div>
                    <div className='font-black text-2xl text-purple-600'>50K+</div>
                    <div className='text-sm text-gray-600 font-semibold'>Trips Planned</div>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float animation-delay-2000 z-20'>
                <div className='flex items-center gap-3'>
                  <div className='text-3xl'>⚡</div>
                  <div>
                    <div className='font-black text-2xl text-pink-600'>30 sec</div>
                    <div className='text-sm text-gray-600 font-semibold'>Average Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className='absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50'></div>
            <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-50'></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-gray-600 font-semibold text-sm'>Scroll to explore</span>
          <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero