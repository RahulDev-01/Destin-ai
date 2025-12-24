import React from 'react';

function TripGenerationLoader({ progress = 0 }) {
    return (
        <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
            <div className='max-w-md w-full px-8'>
                <div className='text-center space-y-8'>
                    {/* Animated Icon */}
                    <div className='relative'>
                        <div className='w-32 h-32 mx-auto'>
                            <div className='absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-75'></div>
                            <div className='relative w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center'>
                                <svg className='w-16 h-16 text-white animate-pulse' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h2 className='text-3xl font-black text-gray-900 mb-2'>
                            Creating Your Dream Trip
                        </h2>
                        <p className='text-gray-600 font-medium'>
                            Our AI is crafting the perfect itinerary just for you...
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className='space-y-2'>
                        <div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-purple-600 rounded-full transition-all duration-500 ease-out'
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className='text-sm font-bold text-purple-600'>{Math.round(progress)}% Complete</p>
                    </div>

                    {/* Loading Steps */}
                    <div className='text-left space-y-2 text-sm'>
                        <div className={`flex items-center gap-2 ${progress >= 25 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${progress >= 25 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                                {progress >= 25 && <span className='text-white text-xs'>✓</span>}
                            </div>
                            <span className='font-medium'>Analyzing your preferences</span>
                        </div>
                        <div className={`flex items-center gap-2 ${progress >= 50 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${progress >= 50 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                                {progress >= 50 && <span className='text-white text-xs'>✓</span>}
                            </div>
                            <span className='font-medium'>Finding best destinations</span>
                        </div>
                        <div className={`flex items-center gap-2 ${progress >= 75 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${progress >= 75 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                                {progress >= 75 && <span className='text-white text-xs'>✓</span>}
                            </div>
                            <span className='font-medium'>Planning daily activities</span>
                        </div>
                        <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${progress >= 100 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                                {progress >= 100 && <span className='text-white text-xs'>✓</span>}
                            </div>
                            <span className='font-medium'>Finalizing your itinerary</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripGenerationLoader;
