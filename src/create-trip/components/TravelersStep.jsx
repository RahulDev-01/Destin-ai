import React from 'react'
import { SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'

function TravelersStep({ formData, handleInputChange, onNext, onBack }) {
    return (
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl font-black text-gray-900'>
                    Who are you traveling with? 👥
                </h2>
                <p className='text-gray-500 text-lg'>
                    Select your traveler type to help us plan better.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {SelectTravelList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('Peoples', item.people)}
                        className={`cursor-pointer group relative p-6 border-2 rounded-2xl transition-all duration-300 hover:-translate-y-1
              ${formData?.Peoples === item.people
                                ? 'border-blue-600 bg-blue-50/50 shadow-xl ring-2 ring-blue-600 ring-offset-2'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                            }
            `}
                    >
                        <div className='text-5xl mb-4 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mx-auto group-hover:scale-110 transition-transform'>
                            {item.icon}
                        </div>

                        <div className='text-center space-y-2'>
                            <h3 className='font-bold text-xl text-gray-900'>{item.title}</h3>
                            <p className='text-sm text-gray-500 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                        </div>

                        {formData?.Peoples === item.people && (
                            <div className='absolute top-4 right-4 text-blue-600 bg-white rounded-full p-1 shadow-sm'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
                    className="h-14 px-8 text-lg font-bold text-gray-500"
                >
                    ← Back
                </Button>
                <Button
                    disabled={!formData?.Peoples}
                    onClick={onNext}
                    className="h-14 px-10 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default TravelersStep
