import React from 'react'

function Testimonials() {
  const testimonials = [
    {
      quote: "This AI planner saved me hours of research! My Japan trip was perfectly organized and I discovered places I would have never found on my own. Absolutely amazing! 🇯🇵",
      name: 'Sarah Chen',
      role: 'Solo Traveler',
      avatar: 'https://i.pravatar.cc/96?img=5',
      rating: 5,
      location: '🌸 Tokyo, Japan',
    },
    {
      quote: "Planning our family vacation was stress-free! The AI understood our needs perfectly and created an itinerary that kept everyone happy. Best tool ever! 👨‍👩‍👧‍👦",
      name: 'Michael Rodriguez',
      role: 'Family Vacation',
      avatar: 'https://i.pravatar.cc/96?img=12',
      rating: 5,
      location: '🏖️ Bali, Indonesia',
    },
    {
      quote: "As a budget traveler, this tool is a game-changer! It helped me maximize my experience while staying within budget. Highly recommend to everyone! 💰",
      name: 'Emma Thompson',
      role: 'Budget Explorer',
      avatar: 'https://i.pravatar.cc/96?img=45',
      rating: 5,
      location: '🗼 Paris, France',
    },
  ]

  return (
    <section className='w-full bg-white py-20 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <div className='inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-2 text-sm font-semibold text-yellow-700 mb-4'>
            ⭐ Testimonials
          </div>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900'>
            Loved by <span className='text-blue-600'>Travelers Worldwide</span> 🌍
          </h2>
          <p className='text-lg text-gray-600'>See what our community is saying about their experiences</p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className='group relative rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg hover-lift border border-gray-200 hover:border-blue-300 transition-all duration-300'
            >
              {/* Quote Icon */}
              <div className='absolute top-6 right-6 text-6xl opacity-10'>💬</div>

              {/* Stars */}
              <div className='flex items-center gap-1 mb-4'>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    className='h-5 w-5 text-yellow-400 fill-current'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0L7.105 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.47 8.72c-.783-.57-.38-1.81.588-1.81H7.52a1 1 0 00.95-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className='text-gray-700 text-base leading-relaxed mb-6 relative z-10'>
                "{t.quote}"
              </p>

              {/* Author */}
              <div className='flex items-center gap-4 pt-4 border-t border-gray-200'>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className='w-12 h-12 rounded-full ring-2 ring-blue-100'
                />
                <div>
                  <div className='font-bold text-gray-900'>{t.name}</div>
                  <div className='text-sm text-gray-600'>{t.role}</div>
                  <div className='text-xs text-blue-600 mt-1'>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className='mt-16 text-center'>
          <div className='inline-flex flex-col items-center gap-3 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200'>
            <div className='flex items-center gap-2'>
              <span className='text-4xl'>🏆</span>
              <div className='text-left'>
                <div className='text-2xl font-bold text-gray-900'>Trusted by 10,000+ Travelers</div>
                <div className='text-sm text-gray-600'>Join our growing community of happy explorers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
