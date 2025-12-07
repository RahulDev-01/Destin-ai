import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Features() {
  const features = [
    {
      title: 'AI-Powered Itineraries',
      desc: 'Get a day-by-day plan tailored to your interests, time and budget in seconds.',
      icon: (
        <svg className='h-6 w-6 text-purple-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Smart Budgeting',
      desc: 'Choose your budget and travel style—get recommendations that fit.',
      icon: (
        <svg className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Instant Edits',
      desc: 'Regenerate or tweak any part of a trip—hotels, activities, food and more.',
      icon: (
        <svg className='h-6 w-6 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Local Gems',
      desc: 'Find hidden spots and popular attractions with balanced, realistic pacing.',
      icon: (
        <svg className='h-6 w-6 text-orange-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      ),
      gradient: 'from-sky-500 to-blue-700',
    },
  ]

  return (
    <section className='w-full bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='max-w-3xl mx-auto text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900'>
            Powerful Features for <span className='text-blue-600'>Smarter Planning</span>
          </h2>
          <p className='text-lg text-gray-600'>Everything you need to craft the perfect trip—without the spreadsheets.</p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((f, idx) => (
            <div
              key={f.title}
              className='group relative rounded-2xl bg-white p-6 shadow-md hover-lift border border-gray-100 hover:border-blue-200 transition-all duration-200'
            >

              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-md mb-4 group-hover:scale-105 transition-transform duration-200`}>
                <div className='text-white'>
                  {f.icon}
                </div>
              </div>

              <h3 className='text-lg font-bold mb-2 text-gray-900'>
                {f.title}
              </h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Link to='/create-trip'>
            <Button className='h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200'>
              Start Planning Your Trip
              <svg className='ml-2 h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features
