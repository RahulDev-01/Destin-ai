import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DestinationStep({ formData, handleInputChange, onNext }) {
    const popularPlaces = [
        { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
        { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
        { name: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80' },
        { name: 'London, UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
    ]

    const handleSuggestionClick = (place) => {
        handleInputChange('location', place)
    }

    return (
        <div className='flex flex-col gap-8 animate-fade-in'>
            <div className='text-center space-y-3 sm:space-y-4 px-2'>
                <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight'>
                    Where is your next <span className='text-purple-600'>adventure?</span>
                </h2>
                <p className='text-gray-500 text-sm sm:text-xl font-medium'>
                    Enter the destination you've been dreaming about.
                </p>
            </div>

            <div className='space-y-8 mt-4'>
                <div className='relative max-w-2xl mx-auto group'>
                    <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                        <Input
                            placeholder="Search destination..."
                            className="h-14 sm:h-20 text-lg sm:text-2xl px-6 sm:px-8 rounded-2xl border-0 bg-white shadow-xl ring-1 ring-gray-900/5 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all duration-300"
                            value={formData?.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                        <div className='absolute right-5 sm:right-6 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl opacity-50 pointer-events-none'>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center'>
                        Popular Destinations
                    </h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
                        {popularPlaces.map((place, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(place.name)}
                                className='group relative h-32 sm:h-40 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                            >
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                />
                                <div className='absolute inset-0 bg-black/70 opacity-80 group-hover:opacity-90 transition-opacity'></div>
                                <div className='absolute bottom-0 left-0 p-3 sm:p-4 text-white w-full'>
                                    <div className='text-[8px] sm:text-[10px] font-bold uppercase tracking-wider mb-0.5 sm:mb-1 opacity-80'>Take me to</div>
                                    <div className='font-bold text-sm sm:text-lg leading-tight'>
                                        {place.name.split(',')[0]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex justify-end pt-8'>
                <Button
                    disabled={!formData?.location}
                    onClick={onNext}
                    className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default DestinationStep
