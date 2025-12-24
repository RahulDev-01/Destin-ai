import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DurationStep({ formData, handleInputChange, onNext, onBack }) {
    const presets = [
        { label: 'Weekend Trip', days: 3 },
        { label: 'One Week', days: 7 },
        { label: 'Two Weeks', days: 14 },
    ]

    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-3 sm:space-y-4 px-2'>
                <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight'>
                    How long is your <span className='text-purple-600'>trip?</span>
                </h2>
                <p className='text-gray-500 text-sm sm:text-xl font-medium'>
                    Tell us how many days you want to explore.
                </p>
            </div>

            <div className='space-y-10 max-w-xl mx-auto w-full'>
                <div className='flex items-center gap-4 sm:gap-6 justify-center'>
                    <Button
                        variant="outline"
                        className="h-14 w-14 sm:h-20 sm:w-20 rounded-full text-2xl sm:text-3xl border-2 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex-shrink-0"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current > 1) handleInputChange('noOfDays', current - 1)
                        }}
                    >
                        -
                    </Button>

                    <div className='relative w-full max-w-[180px] sm:max-w-[240px]'>
                        <div className="absolute -inset-0.5 bg-blue-600 rounded-3xl blur opacity-30"></div>
                        <Input
                            type="number"
                            placeholder="0"
                            max="20"
                            className="relative h-20 sm:h-24 text-center text-4xl sm:text-6xl font-black rounded-3xl border-0 bg-white shadow-xl focus-visible:ring-0 text-gray-800"
                            value={formData?.noOfDays || ''}
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                        <span className='absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-sm font-black text-gray-400 uppercase tracking-widest'>
                            Days
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        className="h-14 w-14 sm:h-20 sm:w-20 rounded-full text-2xl sm:text-3xl border-2 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex-shrink-0"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current < 20) handleInputChange('noOfDays', current + 1)
                        }}
                    >
                        +
                    </Button>
                </div>

                <div className='grid grid-cols-3 gap-3 sm:gap-6'>
                    {presets.map((preset, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('noOfDays', preset.days)}
                            className={`cursor-pointer p-4 sm:p-6 rounded-2xl border-2 text-center transition-all duration-500 hover:shadow-lg
                ${parseInt(formData?.noOfDays) === preset.days
                                    ? 'border-purple-600 bg-purple-50 shadow-md ring-1 ring-purple-600'
                                    : 'border-gray-100 bg-white hover:border-purple-200'
                                }
              `}
                        >
                            <div className='text-2xl sm:text-3xl mb-1 sm:mb-2 font-bold text-purple-600'>{preset.days}</div>
                            <div className='font-black text-[10px] sm:text-base text-gray-800 leading-tight'>{preset.label}</div>
                        </div>
                    ))}
                </div>

                <p className='text-center text-sm font-medium text-amber-600 bg-amber-50 py-3 px-6 rounded-full inline-block mx-auto'>
                    ⚠️ Maximum 20 days allowed for optimal AI generation
                </p>
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
                    disabled={!formData?.noOfDays || formData?.noOfDays > 20 || formData?.noOfDays < 1}
                    onClick={onNext}
                    className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default DurationStep
