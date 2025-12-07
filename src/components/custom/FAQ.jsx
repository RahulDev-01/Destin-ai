import React, { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      emoji: '💳',
      q: 'Is this service really free?',
      a: 'Yes! Our basic trip planning service is completely free. No credit card required, no hidden fees. Create unlimited trips and save them to your account.',
    },
    {
      emoji: '🔐',
      q: 'Do I need to create an account?',
      a: 'You can explore and generate trips without signing in. However, creating a free account allows you to save trips, access them across devices, and customize them anytime.',
    },
    {
      emoji: '✏️',
      q: 'Can I modify the AI-generated itinerary?',
      a: 'Absolutely! The AI creates a starting point, but you have full control to edit, add, or remove activities. Customize every detail to match your perfect trip.',
    },
    {
      emoji: '🌍',
      q: 'Which destinations are supported?',
      a: 'We support destinations worldwide! From bustling cities to remote islands, our AI can plan trips anywhere. Just tell us where you want to go.',
    },
    {
      emoji: '⚡',
      q: 'How long does it take to generate a trip?',
      a: 'Most trips are generated in less than 60 seconds! Our AI analyzes your preferences and creates a comprehensive itinerary almost instantly.',
    },
    {
      emoji: '📱',
      q: 'Can I access my trips on mobile?',
      a: 'Yes! Our platform is fully responsive. Access your saved trips from any device - phone, tablet, or computer - anytime, anywhere.',
    },
  ]

  return (
    <section className='w-full bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24'>
      <div className='mx-auto max-w-4xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-semibold text-green-700 mb-4'>
            ❓ FAQ
          </div>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900'>
            Got <span className='text-blue-600'>Questions?</span> 🤔
          </h2>
          <p className='text-lg text-gray-600'>Everything you need to know about planning with AI</p>
        </div>

        {/* FAQ Accordion */}
        <div className='space-y-4'>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className='rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 overflow-hidden'
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className='w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start gap-4 flex-1'>
                  <span className='text-3xl'>{faq.emoji}</span>
                  <span className='font-bold text-lg text-gray-900 pt-1'>{faq.q}</span>
                </div>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-200 mt-1 ${openIndex === idx ? 'rotate-180' : ''
                    }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40' : 'max-h-0'
                  }`}
              >
                <div className='px-6 pb-6 pl-20'>
                  <p className='text-gray-600 leading-relaxed'>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className='mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100'>
          <div className='text-4xl mb-3'>💬</div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>Still have questions?</h3>
          <p className='text-gray-600 mb-4'>We're here to help! Reach out to our support team</p>
          <a
            href='mailto:support@example.com'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg'
          >
            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
            </svg>
            Contact Support 📧
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
