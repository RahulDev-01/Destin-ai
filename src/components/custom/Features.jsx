import React from 'react'
import { Button } from '../ui/button'

function Features() {
  const features = [
    {
      title: 'AI-Powered Itineraries',
      desc: 'Get a day-by-day plan tailored to your interests, time and budget in seconds.',
      icon: (
        <svg className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12 6v6l4 2' />
        </svg>
      ),
    },
    {
      title: 'Smart Budgeting',
      desc: 'Choose your budget and travel style—get recommendations that fit.',
      icon: (
        <svg className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12 8c-3.866 0-7 1.79-7 4s3.134 4 7 4 7-1.79 7-4-3.134-4-7-4z' />
        </svg>
      ),
    },
    {
      title: 'Instant Edits',
      desc: 'Regenerate or tweak any part of a trip—hotels, activities, food and more.',
      icon: (
        <svg className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M11 5H6a2 2 0 00-2 2v11a1 1 0 001 1h11a2 2 0 002-2v-5' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
        </svg>
      ),
    },
    {
      title: 'Local Gems',
      desc: 'Find hidden spots and popular attractions with balanced, realistic pacing.',
      icon: (
        <svg className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M19.5 8c0 7.5-7.5 12-7.5 12S4.5 15.5 4.5 8a7.5 7.5 0 1115 0z' />
        </svg>
      ),
    },
  ]

  return (
    <section className='w-full bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight'>Plan smarter with powerful features</h2>
          <p className='mt-3 text-gray-600'>Everything you need to craft the perfect trip—without the spreadsheets.</p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((f) => (
            <div key={f.title} className='rounded-2xl border p-6 bg-white/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100'>
                {f.icon}
              </div>
              <h3 className='mt-4 text-lg font-semibold'>{f.title}</h3>
              <p className='mt-2 text-sm text-gray-600'>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className='mt-10'>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg'>Explore features</Button>
        </div>
      </div>
    </section>
  )
}

export default Features
