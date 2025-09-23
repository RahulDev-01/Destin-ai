import React from 'react'

function Testimonials() {
  const items = [
    {
      quote: 'Planned a 7-day Japan trip in under 2 minutes. The pacing and food picks were spot on!',
      name: 'Aarav',
      meta: 'Solo Traveller',
      avatar: 'https://i.pravatar.cc/96?img=12',
      rating: 5,
    },
    {
      quote: 'We loved the family-friendly suggestions and the ability to quickly edit days.',
      name: 'Isha & Karan',
      meta: 'Family Trip',
      avatar: 'https://i.pravatar.cc/96?img=32',
      rating: 5,
    },
    {
      quote: 'Saved me hours of research. Highly recommend for weekend getaways!',
      name: 'Neeraj',
      meta: 'Weekend Traveller',
      avatar: 'https://i.pravatar.cc/96?img=68',
      rating: 4,
    },
  ]

  return (
    <section className='w-full bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight'>Loved by travellers</h2>
          <p className='mt-3 text-gray-600'>Thousands of trips planned and counting.</p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3'>
          {items.map((t, i) => (
            <figure key={i} className='rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <img src={t.avatar} alt={t.name} className='h-10 w-10 rounded-full object-cover ring-2 ring-blue-100'/>
                  <div className='text-sm'>
                    <div className='font-semibold text-gray-900'>{t.name}</div>
                    <div className='text-gray-500'>{t.meta}</div>
                  </div>
                </div>
                <div className='flex items-center'>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} className={`h-4 w-4 ${idx < (t.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0L7.105 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.47 8.72c-.783-.57-.38-1.81.588-1.81H7.52a1 1 0 00.95-.69l1.07-3.292z'/>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className='mt-4 text-gray-700'>“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
