import React from 'react'

function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      emoji: '🗽',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'This AI planner saved me HOURS of research! My Tokyo trip was perfectly planned with amazing hidden gems I would have never found.',
      trip: 'Tokyo Adventure',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      emoji: '🇸🇬',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Absolutely incredible! The AI understood exactly what I wanted. My European backpacking trip was flawless from start to finish.',
      trip: 'Europe Backpacking',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      emoji: '🇪🇸',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'Best travel planning tool ever! It matched my budget perfectly and suggested activities I absolutely loved. 10/10 recommend!',
      trip: 'Bali Getaway',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'James Wilson',
      location: 'London, UK',
      emoji: '🇬🇧',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 5,
      text: 'Mind-blowing experience! The itinerary was so detailed and personalized. Every recommendation was spot-on. Can\'t wait to use it again!',
      trip: 'Dubai Luxury Trip',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Priya Patel',
      location: 'Mumbai, India',
      emoji: '🇮🇳',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'This changed how I travel! No more stress or endless planning. Just input my preferences and boom - perfect itinerary in seconds!',
      trip: 'Paris Romance',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'David Kim',
      location: 'Seoul, Korea',
      emoji: '🇰🇷',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      text: 'Revolutionary! The AI considered everything - budget, interests, even weather. My Australia trip exceeded all expectations!',
      trip: 'Australia Explorer',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className='relative w-full py-24 md:py-32 bg-white overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-20 space-y-4 px-4'>
          <div className='inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full'>
            <span className='text-xl sm:text-2xl'>💬</span>
            <span className='font-bold text-green-700 text-xs sm:text-sm uppercase tracking-wider'>Testimonials</span>
          </div>
          <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-purple-600'>
            Loved by Travelers
          </h2>
          <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
            Join thousands of happy travelers who trust our AI to plan their perfect adventures
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100'
            >


              {/* Content */}
              <div className='relative z-10'>
                {/* Stars */}
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-2xl text-yellow-400'>★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className='text-gray-700 leading-relaxed mb-6 font-medium text-lg'>
                  "{testimonial.text}"
                </p>

                {/* Trip Badge */}
                <div className={`inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6`}>
                  <span className='text-white font-bold text-sm'>{testimonial.trip}</span>
                </div>

                {/* Author Info */}
                <div className='flex items-center gap-4'>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className='w-14 h-14 rounded-full border-4 border-gray-100 shadow-md transform group-hover:scale-110 transition-transform duration-300'
                    onError={(e) => {
                      if (e.target.src.includes('pravatar')) {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&size=150`;
                      } else if (e.target.src.includes('ui-avatars')) {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`;
                      }
                    }}
                  />
                  <div>
                    <h4 className='font-black text-gray-900 text-lg'>{testimonial.name}</h4>
                    <p className='text-gray-600 font-medium flex items-center gap-1'>
                      <span>{testimonial.emoji}</span>
                      <span>{testimonial.location}</span>
                    </p>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className='absolute top-4 right-4 text-6xl text-gray-200 group-hover:text-gray-300 transition-colors duration-300'>
                  "
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
