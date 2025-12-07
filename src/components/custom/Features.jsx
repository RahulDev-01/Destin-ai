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
      gradient: 'from-purple-500 to-pink-500',
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
      gradient: 'from-green-500 to-emerald-500',
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
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section className='relative w-full bg-gradient-to-b from-white via-purple-50/30 to-white py-20 sm:py-24 overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'></div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-4'>
            <span className='gradient-text'>Plan Smarter</span> with Powerful Features
          </h2>
          <p className='text-lg text-gray-600'>Everything you need to craft the perfect trip—without the spreadsheets.</p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((f, idx) => (
            <div
              key={f.title}
              className='group relative rounded-3xl bg-white p-8 shadow-lg hover-lift border border-gray-100 hover:border-transparent overflow-hidden'
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>

              {/* Icon Container */}
              <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className='absolute inset-0 bg-white/20 rounded-2xl'></div>
                <div className='relative text-white'>
                  {f.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300'>
                {f.title}
              </h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{f.desc}</p>

              {/* Decorative Element */}
              <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${f.gradient} rounded-full opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='mt-16 text-center'>
          <Link to='/create-trip'>
            <Button className='h-14 px-10 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105'>
              Start Planning Your Trip
              <svg className='ml-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
