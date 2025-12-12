import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DurationStep({ formData, handleInputChange, onNext, onBack }) {
    const presets = [
        { label: 'Weekend Trip', days: 3, emoji: '🎉' },
        { label: 'One Week', days: 7, emoji: '🏖️' },
        { label: 'Two Weeks', days: 14, emoji: '🏔️' },
    ]

    return (
        <div className='flex flex-col gap-10 animate-fade-in'>
            <div className='text-center space-y-4'>
                <h2 className='text-4xl font-black text-gray-900 leading-tight'>
                    How long is your <span className='text-purple-600'>trip?</span> 📅
                </h2>
                <p className='text-gray-500 text-xl font-medium'>
                    Tell us how many days you want to explore.
                </p>
            </div>

            <div className='space-y-10 max-w-xl mx-auto w-full'>
                <div className='flex items-center gap-6 justify-center'>
                    <Button
                        variant="outline"
                        className="h-20 w-20 rounded-full text-3xl border-2 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current > 1) handleInputChange('noOfDays', current - 1)
                        }}
                    >
                        -
                    </Button>

                    <div className='relative w-full max-w-[240px]'>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-30"></div>
                        <Input
                            type="number"
                            placeholder="0"
                            max="20"
                            className="relative h-24 text-center text-6xl font-black rounded-3xl border-0 bg-white shadow-xl focus-visible:ring-0 text-gray-800"
                            value={formData?.noOfDays || ''}
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                        <span className='absolute bottom-3 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-400 uppercase tracking-widest'>
                            Days
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        className="h-20 w-20 rounded-full text-3xl border-2 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current < 20) handleInputChange('noOfDays', current + 1)
                        }}
                    >
                        +
                    </Button>
                </div>

                <div className='grid grid-cols-3 gap-6'>
                    {presets.map((preset, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('noOfDays', preset.days)}
                            className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${parseInt(formData?.noOfDays) === preset.days
                                    ? 'border-purple-600 bg-purple-50 shadow-md ring-1 ring-purple-600'
                                    : 'border-gray-100 bg-white hover:border-purple-200'
                                }
              `}
                        >
                            <div className='text-3xl mb-2'>{preset.emoji}</div>
                            <div className='font-bold text-base text-gray-800'>{preset.label}</div>
                        </div>
                    ))}
                </div>

                <p className='text-center text-sm font-medium text-amber-600 bg-amber-50 py-3 px-6 rounded-full inline-block mx-auto'>
                    ⚠️ Maximum 20 days allowed for optimal AI generation
                </p>
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
                    disabled={!formData?.noOfDays || formData?.noOfDays > 20 || formData?.noOfDays < 1}
                    onClick={onNext}
                    className="h-16 px-12 text-xl rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default DurationStep
