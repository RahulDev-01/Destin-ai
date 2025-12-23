import React from 'react'

function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Intelligence',
      description: 'Advanced algorithms analyze millions of data points to create your perfect itinerary',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get comprehensive travel plans in under 30 seconds. No more hours of research',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: '💰',
      title: 'Budget Optimizer',
      description: 'Smart recommendations that match your budget without compromising experience',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: '🎯',
      title: 'Personalized Plans',
      description: 'Every itinerary is unique, tailored to your interests and travel style',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Access to destinations worldwide with local insights and hidden gems',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access your plans anywhere, anytime on any device. Always in your pocket',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    }
  ]

  return (
    <section className='relative w-full py-24 md:py-32 bg-white overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20'></div>
        <div className='absolute bottom-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-20 space-y-4 px-4'>

          <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-purple-600'>
            Powerful Features
          </h2>
          <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
            Everything you need to plan the perfect trip, powered by cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'
            >

              <div className='relative z-10'>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.bgColor} rounded-2xl mb-6 text-5xl font-black text-purple-600 shadow-md`}>
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className='text-2xl font-black text-gray-900 mb-3'>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className='text-gray-600 leading-relaxed font-medium'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default Features
