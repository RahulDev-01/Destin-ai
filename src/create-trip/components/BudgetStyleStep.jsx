import React from 'react'
import { SelectBudgetOptions } from '@/constants/options'
import { Button } from '@/components/ui/button'

function BudgetStyleStep({ formData, handleInputChange, onNext, onBack }) {
    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-3 sm:space-y-4 px-2'>
                <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight'>
                    What's your <span className='text-purple-600'>budget?</span>
                </h2>
                <p className='text-gray-500 text-sm sm:text-xl font-medium'>
                    The budget is exclusively allocated for activities and dining purposes.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'>
                {SelectBudgetOptions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('budget', item.title)}
                        className={`cursor-pointer group relative p-6 sm:p-8 border-2 rounded-[2rem] transition-all duration-500 hover:-translate-y-2
              ${formData?.budget === item.title
                                ? 'border-purple-600 bg-purple-50/50 shadow-2xl ring-2 ring-purple-600 ring-offset-4'
                                : 'border-gray-100 bg-white hover:border-purple-300 hover:shadow-xl'
                            }
            `}
                    >
                        <div className={`text-4xl sm:text-6xl mb-4 sm:mb-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg mx-auto transition-transform duration-700 group-hover:rotate-12
                            ${formData?.budget === item.title ? 'bg-white' : 'bg-gray-50 group-hover:bg-white'}
                        `}>
                            {item.icon}
                        </div>

                        <div className='text-center space-y-2 sm:space-y-3'>
                            <h3 className='font-black text-xl sm:text-2xl text-gray-900 uppercase tracking-tight'>{item.title}</h3>
                            <p className='text-xs sm:text-base text-gray-500 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                        </div>

                        {formData?.budget === item.title && (
                            <div className='absolute top-4 right-4 text-purple-600 bg-white rounded-full p-1 sm:p-1.5 shadow-md animate-in zoom-in duration-500'>
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
                    disabled={!formData?.budget}
                    onClick={onNext}
                    className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default BudgetStyleStep
