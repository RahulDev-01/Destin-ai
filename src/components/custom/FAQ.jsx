import React from 'react'

function FAQ() {
  const faqs = [
    {
      q: 'Is Destin AI free to use?',
      a: 'Yes, you can plan trips for free. We may add premium options in the future for power users.'
    },
    {
      q: 'Do I need to sign in?',
      a: 'You can generate trips without signing in. Sign in to save and access them later across devices.'
    },
    {
      q: 'Can I edit the itinerary?',
      a: 'Absolutely. Regenerate days, swap activities, or change pace. Your plan stays consistent.'
    },
  ]

  return (
    <section className='w-full bg-slate-50 py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight'>Frequently asked questions</h2>
          <p className='mt-3 text-gray-600'>Everything you need to know about using Destin AI.</p>
        </div>

        <dl className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {faqs.map((f) => (
            <div key={f.q} className='rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100'>
              <dt className='font-semibold'>{f.q}</dt>
              <dd className='mt-2 text-gray-600 text-sm'>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default FAQ
