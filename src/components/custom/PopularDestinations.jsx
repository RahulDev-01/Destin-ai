import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function PopularDestinations() {
    const destinations = [
        {
            name: 'Paris, France',
            emoji: '🗼',
            description: 'City of Love & Lights',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            gradient: 'from-pink-500 to-rose-500',
            highlights: ['Eiffel Tower', 'Louvre', 'Seine River']
        },
        {
            name: 'Tokyo, Japan',
            emoji: '🗾',
            description: 'Modern Meets Traditional',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
            gradient: 'from-red-500 to-pink-500',
            highlights: ['Shibuya', 'Mt. Fuji', 'Temples']
        },
        {
            name: 'Bali, Indonesia',
            emoji: '🏝️',
            description: 'Tropical Paradise',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            gradient: 'from-green-500 to-teal-500',
            highlights: ['Beaches', 'Temples', 'Rice Terraces']
        },
        {
            name: 'New York, USA',
            emoji: '🗽',
            description: 'The City That Never Sleeps',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
            gradient: 'from-blue-500 to-indigo-500',
            highlights: ['Times Square', 'Central Park', 'Broadway']
        },
        {
            name: 'Dubai, UAE',
            emoji: '🏙️',
            description: 'Luxury & Innovation',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            gradient: 'from-yellow-500 to-orange-500',
            highlights: ['Burj Khalifa', 'Desert Safari', 'Malls']
        },
        {
            name: 'Santorini, Greece',
            emoji: '🇬🇷',
            description: 'Aegean Dream',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            gradient: 'from-blue-400 to-cyan-400',
            highlights: ['White Houses', 'Sunsets', 'Beaches']
        }
    ]

    return (
        <section className='relative w-full py-24 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0'>
                <div className='absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
            </div>

            <div className='relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10'>
                {/* Section Header */}
                <div className='text-center mb-12 sm:mb-16 space-y-4 px-4'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full transform hover:scale-110 transition-transform'>
                        <span className='text-xl sm:text-2xl'>🌍</span>
                        <span className='font-bold text-blue-700 text-xs sm:text-sm uppercase tracking-wider'>Explore the World</span>
                    </div>
                    <h2 className='text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient-x bg-size-200'>
                        Popular Destinations
                    </h2>
                    <p className='text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium'>
                        Discover the most sought-after destinations. Let AI plan your perfect trip to these amazing places!
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className='group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'
                        >
                            {/* Image */}
                            <div className='relative h-64 overflow-hidden'>
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} opacity-40 group-hover:opacity-50 transition-opacity duration-500`}></div>

                                {/* Emoji Badge */}
                                <div className='absolute top-4 right-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500'>
                                    {destination.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className='p-6 space-y-4'>
                                <div>
                                    <h3 className='text-2xl font-black text-gray-900 mb-2'>
                                        {destination.name}
                                    </h3>
                                    <p className='text-gray-600 font-medium'>
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div className='flex flex-wrap gap-2'>
                                    {destination.highlights.map((highlight, idx) => (
                                        <span
                                            key={idx}
                                            className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold'
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Link to='/create-trip' className='block'>
                                    <Button className={`w-full bg-gradient-to-r ${destination.gradient} hover:opacity-90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                                        <span className='mr-2'>✈️</span>
                                        Plan Trip to {destination.name.split(',')[0]}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className='mt-12 sm:mt-16 text-center px-4'>
                    <Link to='/create-trip'>
                        <button className='w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:bg-pos-100 bg-size-200 text-white font-black rounded-2xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300'>
                            <span className='mr-2'>🗺️</span>
                            Explore More Destinations
                            <span className='ml-2'>→</span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PopularDestinations
