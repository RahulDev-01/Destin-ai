import React from 'react'

function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className='w-full mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4'>
            <div className='flex items-center justify-between relative max-w-3xl mx-auto'>
                {/* Progress Bar Background */}
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 sm:h-1.5 bg-gray-100 rounded-full -z-10'></div>

                {/* Active Progress Bar */}
                <div
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1 sm:h-1.5 bg-blue-500 rounded-full -z-10 transition-all duration-700 ease-out'
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>

                {[...Array(totalSteps)].map((_, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep

                    return (
                        <div key={index} className='flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default'>
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-xs sm:text-sm md:text-lg border-2 transition-all duration-500 transform
                  ${isActive
                                        ? 'bg-white border-blue-700 text-blue-700 shadow-xl shadow-blue-200 scale-110'
                                        : isCompleted
                                            ? 'bg-blue-500 border-transparent text-white shadow-md'
                                            : 'bg-white border-gray-200 text-gray-300'
                                    }
                `}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : stepNumber}
                            </div>
                            <span className={`text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-tighter sm:tracking-wider transition-colors duration-500 ${isActive ? 'text-blue-700' : isCompleted ? 'text-gray-700' : 'text-gray-300'}`}>
                                {stepNumber === 1 && (isActive ? 'Start' : 'Dest.')}
                                {stepNumber === 2 && 'Days'}
                                {stepNumber === 3 && 'Budget'}
                                {stepNumber === 4 && (isActive ? 'Peoples' : 'Who')}
                                {stepNumber === 5 && 'Plan'}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StepIndicator
