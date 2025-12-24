import React, { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      emoji: '💰',
      question: 'Is this service really free?',
      answer: 'Yes! Our AI travel planner is 100% free to use. We believe everyone should have access to smart travel planning. No hidden fees, no credit card required.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      emoji: '🤖',
      question: 'How does the AI create my itinerary?',
      answer: 'Our advanced AI analyzes millions of data points including your preferences, budget, travel dates, and interests. It then creates a personalized itinerary with hotels, activities, restaurants, and local recommendations tailored specifically for you.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      emoji: '⏱️',
      question: 'How long does it take to generate a plan?',
      answer: 'On average, our AI creates a complete, detailed travel itinerary in just 30 seconds! You\'ll get instant results with comprehensive recommendations.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      emoji: '✏️',
      question: 'Can I customize my itinerary?',
      answer: 'Absolutely! While our AI creates an amazing baseline itinerary, you can easily modify, add, or remove any activities, hotels, or recommendations to perfectly match your preferences.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      emoji: '🌍',
      question: 'Which destinations are supported?',
      answer: 'We support 195+ countries and thousands of cities worldwide! From popular tourist destinations to hidden gems, our AI has comprehensive knowledge of destinations across the globe.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      emoji: '📱',
      question: 'Can I access my plans on mobile?',
      answer: 'Yes! Your travel plans are accessible from any device - desktop, tablet, or mobile. Access your itinerary anytime, anywhere, even offline.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      emoji: '💳',
      question: 'Do I need to create an account?',
      answer: 'You can start planning immediately without an account! However, creating a free account allows you to save multiple trips, access them later, and sync across devices.',
      color: 'from-teal-500 to-green-500'
    },
    {
      emoji: '🎯',
      question: 'How accurate are the recommendations?',
      answer: 'Our AI uses real-time data, verified reviews, and millions of traveler experiences to provide highly accurate recommendations. We maintain a 4.9/5 satisfaction rating from over 50,000 users!',
      color: 'from-red-500 to-orange-500'
    }
  ]

  return (
    <section className='relative w-full py-24 md:py-32 bg-white overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute bottom-1/4 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
      </div>

      <div className='relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-16 space-y-4'>
          <div className='inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full'>
            <span className='text-2xl'>❓</span>
            <span className='font-bold text-indigo-700'>Got Questions?</span>
          </div>
          <h2 className='text-5xl md:text-6xl font-black text-purple-600'>
            Frequently Asked
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Everything you need to know about our AI travel planner
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full flex items-center justify-between p-6 text-left transition-all duration-300'
              >
                <div className='flex items-center gap-4 flex-1'>
                  <div className={`flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-md`}>
                    {faq.emoji}
                  </div>
                  <h3 className='text-xl font-black text-gray-900'>
                    {faq.question}
                  </h3>
                </div>
                <div className={`flex-shrink-0 ml-4 text-3xl font-bold text-gray-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className='px-6 pb-6 pl-22'>
                  <p className='text-gray-700 leading-relaxed text-lg font-medium'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
