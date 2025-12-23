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
    <section className='relative w-full py-24 md:py-32 bg-white overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-1/3 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-20 space-y-4 px-4'>

          <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-purple-600'>
            How It Works
          </h2>
          <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
            From dream to reality in 4 simple steps. Start planning your adventure today!
          </p>
        </div>

        {/* Steps */}
        <div className='relative'>
          {/* Connecting Line */}
          <div className='hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-purple-300 transform -translate-y-1/2 z-0'></div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10'>
            {steps.map((step, index) => (
              <div key={index} className='relative group'>
                {/* Card */}
                <div className='bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full'>
                  {/* Step Number */}
                  <div className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xl`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${step.bgColor} rounded-2xl mb-6 text-4xl sm:text-5xl font-black text-purple-600 shadow-md`}>
                    {index + 1}
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
      </div>
    </section>
  )
}

export default HowItWorks
