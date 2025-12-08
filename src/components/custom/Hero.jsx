import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-24'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left: Text content */}
          <div className='text-center lg:text-left space-y-8'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 rounded-full bg-blue-50/50 backdrop-blur-sm border border-blue-200/60 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100/50 transition-colors cursor-default'>
              <span className="animate-pulse">🤖</span>
              <span>#1 AI-Powered Trip Planner</span>
            </div>

            {/* Main Heading */}
            <h1 className='font-extrabold leading-tight text-5xl sm:text-6xl lg:text-7xl text-gray-900 tracking-tight'>
              Discover Your Next <br className="hidden lg:block" />
              <span className='gradient-text'>Adventure</span> with AI 🌍
            </h1>

            {/* Description */}
            <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
              Stop spending hours planning. Let our advanced AI craft personalized itineraries tailored to your interests, budget, and travel style in seconds.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2'>
              <Link to={'/create-trip'}>
                <Button className='h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300'>
                  Start Planning Free 🚀
                </Button>
              </Link>
              <Link to={'/create-trip'}>
                <Button variant='outline' className='h-14 px-8 text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all duration-300'>
                  <span className="mr-2">▶</span> Watch Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className='flex items-center justify-center lg:justify-start gap-6 pt-6 border-t border-gray-100'>
              <div className='flex -space-x-4'>
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt='User' className='w-10 h-10 rounded-full border-2 border-white ring-2 ring-gray-100' />
                ))}
              </div>
              <div className='text-sm'>
                <div className='flex items-center gap-1 mb-1'>
                  <span className='font-bold text-gray-900 text-base'>4.9/5</span>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className='text-gray-500 font-medium'>from 10,000+ happy travelers</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className='relative w-full'>
            <div className='relative rounded-2xl overflow-hidden shadow-xl'>
              <img
                src='/plane.jpg'
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