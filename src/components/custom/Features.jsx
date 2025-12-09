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
    <section className='relative w-full py-24 md:py-32 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20'></div>
        <div className='absolute bottom-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-16 space-y-4'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full'>
            <span className='text-2xl'>✨</span>
            <span className='font-bold text-purple-700'>Why Choose Us</span>
          </div>
          <h2 className='text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
            Powerful Features
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Everything you need to plan the perfect trip, powered by cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden'
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className='relative z-10'>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.bgColor} rounded-2xl mb-6 text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className='text-2xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300'>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className='text-gray-600 leading-relaxed font-medium'>
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl'>
          <div className='grid md:grid-cols-4 gap-8 text-center text-white'>
            <div className='space-y-2'>
              <div className='text-5xl font-black'>50K+</div>
              <div className='text-lg font-semibold opacity-90'>Trips Planned</div>
            </div>
            <div className='space-y-2'>
              <div className='text-5xl font-black'>195+</div>
              <div className='text-lg font-semibold opacity-90'>Countries</div>
            </div>
            <div className='space-y-2'>
              <div className='text-5xl font-black'>4.9★</div>
              <div className='text-lg font-semibold opacity-90'>User Rating</div>
            </div>
            <div className='space-y-2'>
              <div className='text-5xl font-black'>30s</div>
              <div className='text-lg font-semibold opacity-90'>Avg. Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
