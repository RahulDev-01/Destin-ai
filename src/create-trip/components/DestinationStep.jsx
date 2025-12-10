import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DestinationStep({ formData, handleInputChange, onNext }) {
    const popularPlaces = [
        { name: 'Paris, France', emoji: '🗼', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
        { name: 'Tokyo, Japan', emoji: '🗾', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
        { name: 'New York, USA', emoji: '🗽', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80' },
        { name: 'London, UK', emoji: '💂', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
    ]

    const handleSuggestionClick = (place) => {
        handleInputChange('location', place)
    }

    return (
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl font-black text-gray-900'>
                    Where is your next adventure? 🌍
                </h2>
                <p className='text-gray-500 text-lg'>
                    Enter the destination you've been dreaming about.
                </p>
            </div>

            <div className='space-y-6'>
                <div className='relative'>
                    <Input
                        placeholder="Search destination (e.g. Rome, Bali, Cape Town)"
                        className="h-16 text-xl px-6 rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-sm"
                        value={formData?.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400'>
                        🔎
                    </div>
                </div>

                <div>
                    <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-4'>
                        Popular Destinations
                    </h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {popularPlaces.map((place, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(place.name)}
                                className='group relative h-32 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all'
                            >
                                <img src={place.image} alt={place.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors'></div>
                                <div className='absolute bottom-0 left-0 p-3 text-white'>
                                    <div className='text-xs font-bold uppercase opacity-80'>Take me to</div>
                                    <div className='font-bold flex items-center gap-1'>
                                        {place.name.split(',')[0]} <span>{place.emoji}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex justify-end pt-4'>
                <Button
                    disabled={!formData?.location}
                    onClick={onNext}
                    className="h-14 px-10 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default DestinationStep
