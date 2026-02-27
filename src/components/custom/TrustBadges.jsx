import React from 'react'

function TrustBadges() {
    const partners = [
        { name: 'Airbnb', color: '#FF5A5F' },
        { name: 'Booking.com', color: '#003580' },
        { name: 'Expedia', color: '#00355F' },
        { name: 'TripAdvisor', color: '#34E0A1' },
        { name: 'Skyscanner', color: '#0770E3' },
    ]

    return (
        <section className='relative w-full py-16 border-t border-b border-gray-100 bg-white'>
            <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center'>
                <p className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-10'>
                    Trusted By Industry Leaders
                </p>

                <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
                    {partners.map((partner, index) => (
                        <span
                            key={index}
                            className='text-xl md:text-2xl font-black tracking-tight opacity-40 hover:opacity-80 transition-opacity duration-300'
                            style={{ color: partner.color }}
                        >
                            {partner.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustBadges
