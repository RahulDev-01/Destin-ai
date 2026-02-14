import React, { Suspense, lazy } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

// Lazy load the Globe component for better performance
const GlobeComponent = lazy(() => import('./GlobeComponent'))

function Hero() {
  return (
    <section className='relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>


      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-20'>
        <div className='flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20 items-center justify-between'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10 z-10 lg:w-1/2'>

            {/* Main Heading with enhanced gradient */}
            <h1 className='font-black leading-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight animate-fade-in'>
              Plan Your <span className='text-blue-700'>Dream Trip</span> in Seconds
            </h1>

            {/* Description */}
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium'>
              Let AI create personalized itineraries tailored to your style, budget, and interests. No more endless research!
            </p>

            {/* CTA Buttons with enhanced effects */}
            <div className='flex flex-col xs:flex-row items-stretch xs:items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-4 sm:pt-6'>
              <Link to={'/create-trip'} className='w-full xs:w-auto'>
                <Button className='group w-full xs:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300'>
                  <span className='drop-shadow-md font-extrabold'>Start Planning Free</span>
                  <span className='ml-2 group-hover:translate-x-1 transition-transform'>→</span>
                </Button>
              </Link>
              <Link to={'/create-trip'} className='w-full xs:w-auto'>
                <Button variant='outline' className='w-full xs:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 text-blue-700 font-bold rounded-xl sm:rounded-2xl transition-all duration-300 shadow-md'>
                  <span className="mr-2">▶️</span>
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Social Proof with enhanced styling */}
            <div className='flex items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8'>
              <div className='flex -space-x-3 sm:-space-x-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt='Happy traveler'
                    className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-3 sm:border-4 border-white ring-2 ring-blue-200 shadow-lg hover:scale-110 hover:z-10 hover:ring-blue-400 transition-all duration-300'
                    onError={(e) => {
                      if (e.target.src.includes('pravatar')) {
                        e.target.src = `https://ui-avatars.com/api/?name=User${i}&background=random&size=100`;
                      } else if (e.target.src.includes('ui-avatars')) {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`;
                      }
                    }}
                  />
                ))}
              </div>
              <div className='text-left'>
                <div className='flex items-center gap-1.5 sm:gap-2.5 mb-1'>
                  <span className='font-black text-xl sm:text-2xl md:text-3xl text-blue-700'>4.9</span>
                  <div className="flex text-yellow-400 text-base sm:text-lg md:text-xl drop-shadow-md">★★★★★</div>
                </div>
                <p className='text-gray-500 text-xs sm:text-sm font-semibold'>from <span className='text-blue-700 font-bold'>50,000+</span> travelers</p>
              </div>
            </div>

          </div>

          {/* Right: 3D Globe */}
          <div className='relative w-full z-10 flex items-center justify-center lg:w-1/2 min-h-[280px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[550px]'>
            <div className='relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] flex items-center justify-center'>
              {/* Ambient glow */}
              <div className='absolute inset-0 bg-blue-100 rounded-full opacity-10 animate-blob mix-blend-multiply filter blur-3xl'></div>

              <Suspense fallback={
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-4'>
                    <div className='text-7xl animate-spin text-blue-700'>●</div>
                    <div className='text-blue-700 font-bold text-lg animate-pulse'>Loading Globe...</div>
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
          <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero