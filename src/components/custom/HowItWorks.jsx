import React from 'react'

function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Tell us about your trip',
      desc: 'Destination, dates, travelers, interests and budget—only what you want to share.',
      icon: (
        <svg className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
        </svg>
      ),
    },
    {
      step: '2',
      title: 'Get your itinerary',
      desc: 'A realistic day-by-day plan with activities, food and travel time—ready in seconds.',
      icon: (
        <svg className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
        </svg>
      ),
    },
    {
      step: '3',
      title: 'Customize & export',
      desc: 'Tweak anything, save to your account, and access it on the go.',
      icon: (
        <svg className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
        </svg>
      ),
    },
  ]

  return (
    <section className='relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 sm:py-24 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-4'>
            How It <span className='gradient-text'>Works</span>
          </h2>
          <p className='text-lg text-gray-600'>Plan end-to-end in minutes with our simple flow.</p>
        </div>

        {/* Steps Grid */}
        <div className='relative grid grid-cols-1 gap-8 sm:grid-cols-3'>
          {/* Connecting Line (Desktop) */}
          <div className='hidden sm:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-sky-200' style={{ top: '4rem', left: '16.67%', right: '16.67%' }}></div>

          {steps.map((s, idx) => (
            <div
              key={s.step}
              className='relative group'
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Card */}
              <div className='relative rounded-3xl bg-white p-8 shadow-lg hover-lift border border-gray-100 hover:border-purple-200 transition-all duration-300'>
                {/* Step Number Badge */}
                <div className='absolute -top-6 left-1/2 -translate-x-1/2'>
                  <div className='relative'>
                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300'>
                      <span className='text-2xl font-bold text-white'>{s.step}</span>
                    </div>
                    {/* Glow Effect */}
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                  </div>
                </div>

                {/* Icon */}
                <div className='mt-8 mb-6 flex justify-center'>
                  <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300'>
                    {s.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold mb-3 text-center text-gray-900'>{s.title}</h3>
                <p className='text-sm text-gray-600 text-center leading-relaxed'>{s.desc}</p>

                {/* Decorative Corner */}
                <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300'></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <p className='text-gray-600 mb-4'>Ready to start planning?</p>
          <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'>
            <svg className='h-5 w-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
            </svg>
            <span className='text-sm font-medium text-gray-700'>Takes less than 60 seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
