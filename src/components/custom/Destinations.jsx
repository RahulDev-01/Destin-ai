import React from 'react'

function Destinations() {
    const destinations = [
        {
            name: 'Paris, France',
            emoji: '🗼',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            description: 'City of lights and romance',
            trips: '12,450',
            color: 'from-pink-500 to-rose-500'
        },
        {
            name: 'Tokyo, Japan',
            emoji: '🗾',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
            description: 'Modern meets traditional',
            trips: '10,230',
            color: 'from-red-500 to-orange-500'
        },
        {
            name: 'Bali, Indonesia',
            emoji: '🏝️',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            description: 'Tropical paradise awaits',
            trips: '8,890',
            color: 'from-green-500 to-emerald-500'
        },
        {
            name: 'New York, USA',
            emoji: '🗽',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
            description: 'The city that never sleeps',
            trips: '15,670',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            name: 'Dubai, UAE',
            emoji: '🏙️',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            description: 'Luxury and innovation',
            trips: '9,340',
            color: 'from-yellow-500 to-amber-500'
        },
        {
            name: 'Santorini, Greece',
            emoji: '🇬🇷',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            description: 'Stunning sunsets & white cliffs',
            trips: '7,120',
            color: 'from-blue-400 to-indigo-500'
        }
    ]

    return (
        <section className='relative w-full py-24 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0'>
                <div className='absolute top-1/4 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
                <div className='absolute bottom-1/4 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
            </div>

            <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
                {/* Section Header */}
                <div className='text-center mb-12 sm:mb-16 space-y-4 px-4'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full transform hover:scale-110 transition-transform'>
                        <span className='text-xl sm:text-2xl'>🌍</span>
                        <span className='font-bold text-blue-700 text-xs sm:text-sm uppercase tracking-wider'>Popular Destinations</span>
                    </div>
                    <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x bg-size-200'>
                        Explore the World
                    </h2>
                    <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
                        Discover amazing destinations loved by thousands of travelers. Where will you go next?
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className='group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer'
                        >
                            {/* Image */}
                            <div className='relative h-64 overflow-hidden'>
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                                    onError={(e) => {
                                        e.target.src = '/plane.jpg'
                                    }}
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>

                                {/* Emoji Badge */}
                                <div className='absolute top-4 right-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500'>
                                    {destination.emoji}
                                </div>

                                {/* Trip Count */}
                                <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg'>
                                    <span className='font-black text-gray-900'>{destination.trips}</span>
                                    <span className='text-gray-600 ml-1'>trips planned</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <h3 className='text-2xl font-black text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                                    {destination.name}
                                </h3>
                                <p className='text-gray-600 font-medium mb-4'>
                                    {destination.description}
                                </p>

                                {/* CTA */}
                                <button className={`w-full bg-gradient-to-r ${destination.color} text-white font-bold py-3 rounded-xl transform group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`}>
                                    Plan Your Trip →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className='mt-12 sm:mt-16 text-center px-4'>
                    <button className='w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:bg-pos-100 bg-size-200 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300'>
                        <span className='mr-2'>🌎</span>
                        Explore All Destinations
                        <span className='ml-2'>→</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Destinations
