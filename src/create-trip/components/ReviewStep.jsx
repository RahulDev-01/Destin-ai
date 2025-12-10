import React from 'react'
import { Button } from '@/components/ui/button'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ReviewStep({ formData, onGenerate, onBack, loading }) {
    return (
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto w-full'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl font-black text-gray-900'>
                    Summary of your trip 📝
                </h2>
                <p className='text-gray-500 text-lg'>
                    Review your selections before we generate your custom itinerary.
                </p>
            </div>

            <div className='bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6'>

                {/* Destination */}
                <div className='flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100'>
                    <div className='text-4xl'>📍</div>
                    <div>
                        <div className='text-sm text-gray-500 font-bold uppercase'>Destination</div>
                        <div className='text-xl font-bold text-gray-900'>{formData?.location}</div>
                    </div>
                </div>

                {/* Days */}
                <div className='flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100'>
                    <div className='text-4xl'>📅</div>
                    <div>
                        <div className='text-sm text-gray-500 font-bold uppercase'>Duration</div>
                        <div className='text-xl font-bold text-gray-900'>{formData?.noOfDays} Days</div>
                    </div>
                </div>

                {/* Budget */}
                <div className='flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100'>
                    <div className='text-4xl'>💰</div>
                    <div>
                        <div className='text-sm text-gray-500 font-bold uppercase'>Budget</div>
                        <div className='text-xl font-bold text-gray-900'>{formData?.budget}</div>
                    </div>
                </div>

                {/* Travelers */}
                <div className='flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100'>
                    <div className='text-4xl'>👥</div>
                    <div>
                        <div className='text-sm text-gray-500 font-bold uppercase'>Travelers</div>
                        <div className='text-xl font-bold text-gray-900'>{formData?.Peoples} People</div>
                    </div>
                </div>

            </div>

            <div className='flex justify-between pt-4'>
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-14 px-8 text-lg font-bold text-gray-500"
                >
                    ← Back
                </Button>
                <Button
                    disabled={loading}
                    onClick={onGenerate}
                    className="h-14 px-10 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl shadow-blue-500/30 w-full ml-4 transition-all duration-300 transform hover:scale-105"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                            <span>Generating Magic...</span>
                        </div>
                    ) : (
                        <>
                            <span>Generate My Trip</span>
                            <span className='ml-2'>🚀</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ReviewStep
