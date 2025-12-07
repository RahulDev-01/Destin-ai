import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Features() {
  const features = [
    {
      emoji: '🤖',
      title: 'AI-Powered Planning',
      desc: 'Smart algorithms create personalized itineraries based on your preferences, budget, and travel style.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      emoji: '💰',
      title: 'Budget Optimizer',
      desc: 'Get the most value for your money with intelligent budget allocation across activities and stays.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      emoji: '🗺️',
      title: 'Local Insights',
      desc: 'Discover hidden gems and authentic experiences recommended by locals and fellow travelers.',
      color: 'from-orange-500 to-red-500',
    },
    {
      emoji: '⚡',
      title: 'Instant Generation',
      desc: 'Create complete travel plans in seconds, not hours. Save time and start exploring faster.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section className='w-full bg-white py-20 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 mb-4'>
            ✨ Powerful Features
          </div>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900'>
            Everything You Need for <span className='text-blue-600'>Perfect Trips</span> 🌍
          </h2>
          <p className='text-lg text-gray-600'>Plan smarter, travel better with AI-powered tools designed for modern travelers</p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12'>
          {features.map((f, idx) => (
            <div
              key={f.title}
              className='group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md hover-lift border border-gray-200 hover:border-blue-300 transition-all duration-300'
            >
              {/* Emoji Icon */}
              <div className='text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                {f.emoji}
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold mb-2 text-gray-900'>
                {f.title}
              </h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{f.desc}</p>

              {/* Gradient accent on hover */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 mb-1'>10K+</div>
            <div className='text-sm text-gray-600'>Trips Planned 🎯</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 mb-1'>5K+</div>
            <div className='text-sm text-gray-600'>Happy Travelers 😊</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 mb-1'>150+</div>
            <div className='text-sm text-gray-600'>Destinations 🌎</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 mb-1'>4.9/5</div>
            <div className='text-sm text-gray-600'>User Rating ⭐</div>
          </div>
        </div>

        {/* CTA */}
        <div className='mt-12 text-center'>
          <Link to='/create-trip'>
            <Button className='h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200'>
              Start Planning Your Trip 🚀
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
