import React from 'react'
import { SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'

function TravelersStep({ formData, handleInputChange, onNext, onBack }) {
    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-3 sm:space-y-4 px-2'>
                <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight'>
                    Who are you <span className='text-purple-600'>traveling</span> with? 👥
                </h2>
                <p className='text-gray-500 text-sm sm:text-xl font-medium'>
                    Select your traveler type to help us plan better.
                </p>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
                {SelectTravelList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('Peoples', item.people)}
                        className={`cursor-pointer group relative p-5 sm:p-6 border-2 rounded-[2rem] transition-all duration-500 hover:-translate-y-2
              ${formData?.Peoples === item.people
                                ? 'border-purple-600 bg-purple-50/50 shadow-2xl ring-2 ring-purple-600 ring-offset-4'
                                : 'border-gray-100 bg-white hover:border-purple-300 hover:shadow-xl'
                            }
            `}
                    >
                        <div className={`text-4xl sm:text-5xl mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg mx-auto transition-transform duration-700 group-hover:rotate-12
                            ${formData?.Peoples === item.people ? 'bg-white' : 'bg-gray-50 group-hover:bg-white'}
                        `}>
                            {item.icon}
                        </div>

                        <div className='text-center space-y-2'>
                            <h3 className='font-black text-base sm:text-xl text-gray-900 tracking-tight'>{item.title}</h3>
                            <p className='text-[10px] sm:text-sm text-gray-500 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                        </div>

                        {formData?.Peoples === item.people && (
                            <div className='absolute top-3 right-3 sm:top-4 sm:right-4 text-purple-600 bg-white rounded-full p-1 sm:p-1.5 shadow-md animate-in zoom-in duration-500'>
                                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='flex justify-between items-center pt-8'>
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-14 sm:h-16 px-6 sm:px-10 text-lg sm:text-xl font-black text-gray-500 hover:text-gray-900"
                >
                    ← Back
                </Button>
                <Button
                    disabled={!formData?.Peoples}
                    onClick={onNext}
                    className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default TravelersStep
