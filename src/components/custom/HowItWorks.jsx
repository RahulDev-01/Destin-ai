import React from 'react'

function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Tell us about your trip',
      desc: 'Destination, dates, travelers, interests and budget—only what you want to share.',
    },
    {
      step: '2',
      title: 'Get your itinerary',
      desc: 'A realistic day-by-day plan with activities, food and travel time—ready in seconds.',
    },
    {
      step: '3',
      title: 'Customize & export',
      desc: 'Tweak anything, save to your account, and access it on the go.',
    },
  ]

  return (
    <section className='w-full bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight'>How it works</h2>
          <p className='mt-3 text-gray-600'>Plan end-to-end in minutes with our simple flow.</p>
        </div>

        <ol className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3'>
          {steps.map((s) => (
            <li key={s.step} className='relative rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100'>
              <span className='absolute -top-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold shadow'>
                {s.step}
              </span>
              <h3 className='mt-2 text-lg font-semibold'>{s.title}</h3>
              <p className='mt-2 text-sm text-gray-600'>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
