import React from 'react'

function HowItWorks() {
  const steps = [
    {
      step: '1',
      emoji: '📝',
      title: 'Share Your Preferences',
      desc: 'Tell us where you want to go, your budget, travel dates, and what you love to do.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '2',
      emoji: '🤖',
      title: 'AI Creates Your Plan',
      desc: 'Our smart AI analyzes thousands of options and creates a personalized itinerary just for you.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      step: '3',
      emoji: '✨',
      title: 'Customize & Explore',
      desc: 'Fine-tune your trip, save it, and access it anytime. Your perfect adventure awaits!',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section className='w-full bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <div className='inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 mb-4'>
            🎯 Simple Process
          </div>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900'>
            How It <span className='text-blue-600'>Works</span> 🚀
          </h2>
          <p className='text-lg text-gray-600'>Three simple steps to your dream vacation</p>
        </div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
          {/* Connecting arrows for desktop */}
          <div className='hidden md:block absolute top-24 left-1/4 right-1/4 flex items-center justify-between pointer-events-none'>
            <svg className='w-full h-8 text-blue-200' fill='none' viewBox='0 0 100 20'>
              <path d='M0 10 L45 10 L40 5 M45 10 L40 15' stroke='currentColor' strokeWidth='2' fill='none' />
              <path d='M55 10 L100 10 L95 5 M100 10 L95 15' stroke='currentColor' strokeWidth='2' fill='none' />
            </svg>
          </div>

          {steps.map((s, idx) => (
            <div
              key={s.step}
              className='relative group'
            >
              {/* Card */}
              <div className='relative rounded-3xl bg-white p-8 shadow-lg hover-lift border border-gray-200 hover:border-blue-300 transition-all duration-300 h-full'>
                {/* Step Number */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                  <span className='text-xl font-bold text-white'>{s.step}</span>
                </div>

                {/* Emoji */}
                <div className='text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                  {s.emoji}
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold mb-3 text-gray-900'>{s.title}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100'>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <div className='flex items-center gap-2 text-gray-700'>
              <svg className='h-6 w-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
              <span className='font-semibold'>Takes less than 60 seconds ⚡</span>
            </div>
            <div className='flex items-center gap-2 text-gray-700'>
              <svg className='h-6 w-6 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
              <span className='font-semibold'>100% Free to use 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
