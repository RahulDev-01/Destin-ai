import React from 'react'

function TrustBadges() {
    const partners = [
        { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' },
        { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png' },
        { name: 'Expedia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Expedia_logo_2023.svg/2560px-Expedia_logo_2023.svg.png' },
        { name: 'TripAdvisor', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/2560px-TripAdvisor_Logo.svg.png' },
        { name: 'Skyscanner', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Skyscanner_Logo_2019.svg/2560px-Skyscanner_Logo_2019.svg.png' },
    ]

    return (
        <section className='relative w-full py-16 border-t border-b border-gray-100 bg-white'>
            <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center'>
                <p className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-10'>
                    Trusted By Industry Leaders
                </p>

                <div className='flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500'>
                    {partners.map((partner, index) => (
                        <img
                            key={index}
                            src={partner.logo}
                            alt={partner.name}
                            className='h-8 md:h-10 w-auto object-contain hover:scale-110 transition-transform duration-300'
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustBadges
