import React from 'react'
import { SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'

function TravelersStep({ formData, handleInputChange, onNext, onBack }) {
    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-3 sm:space-y-4 px-2'>
                <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight'>
                    Who are you <span className='text-blue-700'>traveling</span> with?
                </h2>
                <p className='text-gray-500 text-sm sm:text-xl font-medium'>
                    Select your traveler type to help us plan better.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
                {SelectTravelList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('Peoples', item.people)}
                        className={`cursor-pointer group relative p-3 sm:p-5 md:p-6 border-2 rounded-2xl sm:rounded-[2rem] transition-all duration-500
              ${formData?.Peoples === item.people
                                ? 'border-blue-700 bg-blue-50/50 shadow-2xl ring-2 ring-blue-700 ring-offset-4'
                                : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-xl'
                            }
            `}
                    >
                        <div className={`text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg mx-auto transition-transform duration-700 group-hover:rotate-12
                            ${formData?.Peoples === item.people ? 'bg-white' : 'bg-gray-50 group-hover:bg-white'}
                        `}>
                            {item.icon}
                        </div>

                        <div className='text-center space-y-2'>
                            <h3 className='font-black text-sm sm:text-base md:text-xl text-gray-900 tracking-tight'>{item.title}</h3>
                            <p className='text-[9px] sm:text-[10px] md:text-sm text-gray-500 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                        </div>

                        {formData?.Peoples === item.people && (
                            <div className='absolute top-3 right-3 sm:top-4 sm:right-4 text-blue-700 bg-white rounded-full p-1 sm:p-1.5 shadow-md animate-in zoom-in duration-500'>
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
                    className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default TravelersStep
