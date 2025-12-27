import React from 'react'
import { Button } from '@/components/ui/button'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ReviewStep({ formData, onGenerate, onBack, loading }) {
    return (
        <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto w-full'>
            <div className='text-center space-y-2 px-2'>
                <h2 className='text-2xl sm:text-3xl font-black text-gray-900'>
                    Review your Trip
                </h2>
                <p className='text-gray-500 text-sm sm:text-lg font-medium'>
                    Double check your selections before we work our AI magic.
                </p>
            </div>

            <div className='bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4 sm:space-y-6'>

                {/* Destination */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Destination</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.location}</div>
                    </div>
                </div>

                {/* Days */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Duration</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.noOfDays} Days</div>
                    </div>
                </div>

                {/* Budget */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className='text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-widest'>Budget</div>
                        <div className='text-lg sm:text-xl font-black text-gray-900 leading-tight'>{formData?.budget}</div>
                    </div>
                </div>

                {/* Travelers */}
                <div className='flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all'>
                    <div className='text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-sm'>
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
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
                    className="h-14 sm:h-16 px-10 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-2xl shadow-blue-500/30 w-full order-1 sm:order-2 transition-all duration-500"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                            <span>Generating Magic...</span>
                        </div>
                    ) : (
                        <>
                            <span>Generate Dream Trip</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ReviewStep
