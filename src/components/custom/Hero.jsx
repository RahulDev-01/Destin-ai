import React, { Suspense, lazy } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

// Lazy load the Globe component for better performance
const GlobeComponent = lazy(() => import('./GlobeComponent'))

function Hero() {
  return (
    <section className='relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden flex flex-col justify-center'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>

        {/* Additional subtle gradient mesh */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-100/10 via-transparent to-pink-100/10'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-12 md:py-20'>
        <div className='flex flex-col lg:flex-row gap-16 lg:gap-20 items-center justify-between'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-10 z-10 lg:w-1/2'>
            {/* Badge with floating animation */}
            <div className='inline-flex items-center gap-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 px-6 py-3 text-sm font-bold text-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-default animate-float'>
              <span className="text-xl animate-bounce">✨</span>
              <span>AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading with enhanced gradient */}
            <h1 className='font-black leading-tight text-5xl sm:text-6xl lg:text-7xl tracking-tight animate-fade-in'>
              Plan Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient-x'>Dream Trip</span> in Seconds
            </h1>

            {/* Description */}
            <p className='text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium'>
              Let AI create personalized itineraries tailored to your style, budget, and interests. No more endless research! 🎯
            </p>

            {/* CTA Buttons with enhanced effects */}
            <div className='flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-6'>
              <Link to={'/create-trip'}>
                <Button className='group h-16 px-12 text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 font-bold rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300' style={{ color: 'white' }}>
                  <span className='mr-2'>🚀</span>
                  <span className='text-white'>Start Planning Free</span>
                  <span className='ml-2 group-hover:translate-x-1 transition-transform text-white'>→</span>
                </Button>
              </Link>
              <Link to={'/create-trip'}>
                <Button variant='outline' className='h-16 px-12 text-xl border-2 border-purple-200 hover:border-purple-600 hover:bg-purple-50 text-purple-700 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl'>
                  <span className="mr-2">▶️</span>
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Social Proof with enhanced styling */}
            <div className='flex items-center justify-center lg:justify-start gap-8 pt-8'>
              <div className='flex -space-x-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt='Happy traveler'
                    className='w-14 h-14 rounded-full border-4 border-white ring-2 ring-purple-200 shadow-lg hover:scale-110 hover:z-10 hover:ring-purple-400 transition-all duration-300'
                  />
                ))}
              </div>
              <div className='text-left'>
                <div className='flex items-center gap-2.5 mb-1'>
                  <span className='font-black text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>4.9</span>
                  <div className="flex text-yellow-400 text-xl drop-shadow-md">★★★★★</div>
                </div>
                <p className='text-gray-500 text-sm font-semibold'>from <span className='text-purple-600 font-bold'>50,000+</span> travelers</p>
              </div>
            </div>

          </div>

          {/* Right: 3D Globe */}
          <div className='relative w-full z-10 flex items-center justify-center lg:w-1/2'>
            <div className='relative w-[400px] h-[400px] lg:w-[550px] lg:h-[550px]'>
              {/* Ambient glow */}
              <div className='absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full opacity-10 animate-blob mix-blend-multiply filter blur-3xl'></div>

              <Suspense fallback={
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-4'>
                    <div className='text-7xl animate-spin'>🌍</div>
                    <div className='text-purple-600 font-bold text-lg animate-pulse'>Loading Globe...</div>
                  </div>
                </div>
              }>
                <GlobeComponent />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity'>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Scroll</span>
          <svg className='w-6 h-6 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero