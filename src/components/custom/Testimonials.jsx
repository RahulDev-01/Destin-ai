import React from 'react'

function Testimonials() {
  const items = [
    {
      quote: 'Planned a 7-day Japan trip in under 2 minutes. The pacing and food picks were spot on!',
      name: 'Aarav',
      meta: 'Solo Traveller',
      avatar: 'https://i.pravatar.cc/96?img=12',
      rating: 5,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      quote: 'We loved the family-friendly suggestions and the ability to quickly edit days.',
      name: 'Isha & Karan',
      meta: 'Family Trip',
      avatar: 'https://i.pravatar.cc/96?img=32',
      rating: 5,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      quote: 'Saved me hours of research. Highly recommend for weekend getaways!',
      name: 'Neeraj',
      meta: 'Weekend Traveller',
      avatar: 'https://i.pravatar.cc/96?img=68',
      rating: 4,
      gradient: 'from-sky-500 to-blue-700',
    },
  ]

  return (
    <section className='relative w-full bg-white py-20 sm:py-24 overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute top-1/4 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-1/4 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'></div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-4'>
            Loved by <span className='gradient-text'>Travellers</span>
          </h2>
          <p className='text-lg text-gray-600'>Thousands of trips planned and counting.</p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
          {items.map((t, i) => (
            <figure
              key={i}
              className='group relative rounded-3xl bg-white p-8 shadow-lg hover-lift border border-gray-100 hover:border-transparent overflow-hidden'
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Quote Icon */}
              <div className='relative mb-6'>
                <svg className='h-10 w-10 text-purple-200' fill='currentColor' viewBox='0 0 32 32'>
                  <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className='relative text-gray-700 text-base leading-relaxed mb-6'>
                "{t.quote}"
              </blockquote>

              {/* Author Info */}
              <div className='relative flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {/* Avatar with Gradient Border */}
                  <div className={`relative p-0.5 rounded-full bg-gradient-to-br ${t.gradient}`}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className='h-12 w-12 rounded-full object-cover bg-white'
                    />
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>{t.name}</div>
                    <div className='text-sm text-gray-500'>{t.meta}</div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className='flex items-center gap-0.5'>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      className={`h-5 w-5 ${idx < (t.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0L7.105 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.47 8.72c-.783-.57-.38-1.81.588-1.81H7.52a1 1 0 00.95-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br ${t.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}></div>
            </figure>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className='mt-16 flex flex-wrap items-center justify-center gap-8 text-center'>
          <div className='flex flex-col'>
            <span className='text-4xl font-bold gradient-text'>5,000+</span>
            <span className='text-sm text-gray-600 mt-1'>Happy Travelers</span>
          </div>
          <div className='h-12 w-px bg-gray-200'></div>
          <div className='flex flex-col'>
            <span className='text-4xl font-bold gradient-text'>10,000+</span>
            <span className='text-sm text-gray-600 mt-1'>Trips Planned</span>
          </div>
          <div className='h-12 w-px bg-gray-200'></div>
          <div className='flex flex-col'>
            <span className='text-4xl font-bold gradient-text'>4.9/5</span>
            <span className='text-sm text-gray-600 mt-1'>Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
