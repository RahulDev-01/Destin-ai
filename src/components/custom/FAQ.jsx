import React, { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: 'Is this AI Travel Planner free to use?',
      a: 'Yes, you can plan trips for free. We may add premium options in the future for power users with advanced features.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
    },
    {
      q: 'Do I need to sign in?',
      a: 'You can generate trips without signing in. Sign in to save and access them later across all your devices.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
        </svg>
      ),
    },
    {
      q: 'Can I edit the itinerary?',
      a: 'Absolutely! Regenerate days, swap activities, or change pace. Your plan stays consistent and personalized.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
        </svg>
      ),
    },
    {
      q: 'How accurate are the AI recommendations?',
      a: 'Our AI uses real-time data and traveler reviews to provide highly accurate, personalized recommendations tailored to your preferences.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
    },
    {
      q: 'Can I share my itinerary with others?',
      a: 'Yes! You can easily share your trip plans with friends and family via link or export them as PDF.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
        </svg>
      ),
    },
    {
      q: 'What destinations are supported?',
      a: 'We support destinations worldwide! From popular cities to hidden gems, our AI can plan trips anywhere you want to go.',
      icon: (
        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
    },
  ]

  return (
    <section className='relative w-full bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-4'>
            Frequently Asked <span className='gradient-text'>Questions</span>
          </h2>
          <p className='text-lg text-gray-600'>Everything you need to know about using our AI Travel Planner.</p>
        </div>

        {/* FAQ Grid */}
        <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-5xl mx-auto'>
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className='group relative rounded-3xl bg-white p-6 shadow-lg hover-lift border border-gray-100 hover:border-purple-200 transition-all duration-300 cursor-pointer'
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {/* Icon and Question */}
              <dt className='flex items-start gap-3 mb-3'>
                <div className='flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-300'>
                  {f.icon}
                </div>
                <div className='flex-1'>
                  <span className='font-bold text-gray-900 text-lg'>{f.q}</span>
                  <div className='ml-auto'>
                    <svg
                      className={`h-5 w-5 text-purple-600 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </div>
              </dt>

              {/* Answer */}
              <dd
                className={`text-gray-600 text-sm leading-relaxed ml-13 overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                {f.a}
              </dd>

              {/* Decorative Element */}
              <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-300'></div>
            </div>
          ))}
        </dl>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <p className='text-gray-600 mb-4'>Still have questions?</p>
          <a
            href='mailto:support@example.com'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
          >
            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
