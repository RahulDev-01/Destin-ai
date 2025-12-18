import React from 'react'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '📍',
      title: 'Choose Destination',
      description: 'Tell us where you want to go and when. Pick from thousands of destinations worldwide',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      number: '02',
      icon: '⚙️',
      title: 'Set Preferences',
      description: 'Select your budget, travel style, and interests. Our AI will understand your needs',
      color: 'from-pink-500 to-orange-500',
      bgColor: 'bg-pink-50'
    },
    {
      number: '03',
      icon: '🤖',
      title: 'AI Magic',
      description: 'Watch as our AI analyzes millions of options to create your perfect itinerary',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50'
    },
    {
      number: '04',
      icon: '✈️',
      title: 'Start Exploring',
      description: 'Get your personalized plan with hotels, activities, and local recommendations',
      color: 'from-yellow-500 to-green-500',
      bgColor: 'bg-yellow-50'
    }
  ]

  return (
    <section className='relative w-full py-24 md:py-32 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-1/3 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-20 space-y-4 px-4'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full transform hover:scale-110 transition-transform'>
            <span className='text-xl sm:text-2xl'>🎯</span>
            <span className='font-bold text-orange-700 text-xs sm:text-sm uppercase tracking-wider'>Simple Process</span>
          </div>
          <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 animate-gradient-x bg-size-200'>
            How It Works
          </h2>
          <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
            From dream to reality in 4 simple steps. Start planning your adventure today!
          </p>
        </div>

        {/* Steps */}
        <div className='relative'>
          {/* Connecting Line */}
          <div className='hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-orange-300 to-green-300 transform -translate-y-1/2 z-0'></div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10'>
            {steps.map((step, index) => (
              <div key={index} className='relative group'>
                {/* Card */}
                <div className='bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 h-full'>
                  {/* Step Number */}
                  <div className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${step.bgColor} rounded-2xl mb-6 text-4xl sm:text-5xl transform group-hover:scale-110 transition-all duration-500 shadow-md`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className='text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4'>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-600 leading-relaxed font-medium text-sm sm:text-base'>
                    {step.description}
                  </p>

                  {/* Arrow indicator (except last) */}
                  {index < steps.length - 1 && (
                    <div className='hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2 text-4xl text-orange-400 animate-pulse'>
                      →
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-16 sm:mt-24 px-4'>
          <div className='inline-flex flex-col items-center gap-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden'>
            <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity'></div>
            <h3 className='text-2xl sm:text-5xl font-black text-white text-center leading-tight'>
              Ready to Start Your Journey? 🌟
            </h3>
            <p className='text-base sm:text-xl text-white/90 max-w-2xl text-center font-medium'>
              Join thousands of happy travelers who trust our AI to plan their perfect trips
            </p>
            <button className='bg-white text-indigo-600 px-8 sm:px-12 py-3 sm:py-5 rounded-2xl font-black text-lg sm:text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300'>
              Create Your Trip Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
