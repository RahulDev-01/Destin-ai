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
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl font-black text-gray-900'>
                    How long is your trip? 📅
                </h2>
                <p className='text-gray-500 text-lg'>
                    Tell us how many days you want to explore.
                </p>
            </div>

            <div className='space-y-8 max-w-lg mx-auto w-full'>
                <div className='flex items-center gap-4 justify-center'>
                    <Button
                        variant="outline"
                        className="h-16 w-16 rounded-full text-2xl border-2"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current > 1) handleInputChange('noOfDays', current - 1)
                        }}
                    >
                        -
                    </Button>

                    <div className='relative w-full max-w-[200px]'>
                        <Input
                            type="number"
                            placeholder="0"
                            max="20"
                            className="h-20 text-center text-4xl font-black rounded-2xl border-2 border-blue-100 focus:border-blue-500"
                            value={formData?.noOfDays || ''}
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                        <span className='absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-400 uppercase tracking-widest'>
                            Days
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        className="h-16 w-16 rounded-full text-2xl border-2"
                        onClick={() => {
                            const current = parseInt(formData?.noOfDays || 0)
                            if (current < 20) handleInputChange('noOfDays', current + 1)
                        }}
                    >
                        +
                    </Button>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    {presets.map((preset, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('noOfDays', preset.days)}
                            className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all duration-200
                ${parseInt(formData?.noOfDays) === preset.days
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-100 hover:border-blue-200'
                                }
              `}
                        >
                            <div className='text-2xl mb-1'>{preset.emoji}</div>
                            <div className='font-bold text-sm text-gray-700'>{preset.label}</div>
                        </div>
                    ))}
                </div>

                <p className='text-center text-sm text-amber-600 bg-amber-50 py-2 rounded-lg'>
                    ⚠️ Maximum 20 days allowed for optimal AI generation
                </p>
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
                    disabled={!formData?.noOfDays || formData?.noOfDays > 20 || formData?.noOfDays < 1}
                    onClick={onNext}
                    className="h-14 px-10 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    )
}

export default DurationStep
