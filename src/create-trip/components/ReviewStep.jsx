import React from 'react'
import { Button } from '@/components/ui/button'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ReviewStep({ formData, onGenerate, onBack, loading }) {
    return (
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto w-full'>
            <div className='text-center space-y-2 px-2'>
                <h2 className='text-2xl sm:text-3xl font-black text-gray-900'>
                    Review your Trip 📝
                </h2>
                <p className='text-gray-500 text-sm sm:text-lg font-medium'>
                    Double check your selections before we work our AI magic.
                </p>
            </div>

            <div className='bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4 sm:space-y-6'>

                {/* Destination */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>📍</div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Destination</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.location}</div>
                    </div>
                </div>

                {/* Days */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>📅</div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Duration</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.noOfDays} Days</div>
                    </div>
                </div>

                {/* Budget */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>💰</div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Budget</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.budget}</div>
                    </div>
                </div>

                {/* Travelers */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>👥</div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Travelers</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.Peoples} People</div>
                    </div>
                </div>

            </div>

            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-14 sm:h-16 px-8 text-lg font-black text-gray-500 order-2 sm:order-1"
                >
                    ← Back
                </Button>
                <Button
                    disabled={loading}
                    onClick={onGenerate}
                    className="h-14 sm:h-16 px-10 text-lg rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black shadow-2xl shadow-blue-500/30 w-full order-1 sm:order-2 transition-all duration-500 transform hover:scale-105"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                            <span>Generating Magic...</span>
                        </div>
                    ) : (
                        <>
                            <span>Generate Dream Trip</span>
                            <span className='ml-2'>🚀</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ReviewStep
