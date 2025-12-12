import React from 'react'
import { SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'

function TravelersStep({ formData, handleInputChange, onNext, onBack }) {
    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-4'>
                <h2 className='text-4xl font-black text-gray-900 leading-tight'>
                    Who are you <span className='text-purple-600'>traveling</span> with? 👥
                </h2>
                <p className='text-gray-500 text-xl font-medium'>
                    Select your traveler type to help us plan better.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {SelectTravelList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('Peoples', item.people)}
                        className={`cursor-pointer group relative p-6 border-2 rounded-3xl transition-all duration-300 hover:-translate-y-2
              ${formData?.Peoples === item.people
                                ? 'border-purple-600 bg-purple-50/50 shadow-2xl ring-2 ring-purple-600 ring-offset-4'
                                : 'border-gray-100 bg-white hover:border-purple-300 hover:shadow-xl'
                            }
            `}
                    >
                        <div className={`text-5xl mb-6 w-20 h-20 rounded-full flex items-center justify-center shadow-lg mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                            ${formData?.Peoples === item.people ? 'bg-white' : 'bg-gray-50 group-hover:bg-white'}
                        `}>
                            {item.icon}
                        </div>

                        <div className='text-center space-y-3'>
                            <h3 className='font-black text-xl text-gray-900'>{item.title}</h3>
                            <p className='text-sm text-gray-500 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                        </div>

                        {formData?.Peoples === item.people && (
                            <div className='absolute top-4 right-4 text-purple-600 bg-white rounded-full p-1.5 shadow-md animate-in zoom-in duration-300'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='flex justify-between pt-8'>
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-16 px-10 text-xl font-bold text-gray-500 hover:text-gray-900"
                >
                    ← Back
                </Button>
                <Button
                    disabled={!formData?.Peoples}
                    onClick={onNext}
                    className="h-16 px-12 text-xl rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default TravelersStep
