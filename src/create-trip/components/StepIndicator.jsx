import React from 'react'

function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className='w-full mb-12 px-4'>
            <div className='flex items-center justify-between relative max-w-3xl mx-auto'>
                {/* Progress Bar Background */}
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1.5 bg-gray-100 rounded-full -z-10'></div>

                {/* Active Progress Bar */}
                <div
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1.5 bg-blue-500 rounded-full -z-10 transition-all duration-700 ease-out'
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>

                {[...Array(totalSteps)].map((_, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep

                    return (
                        <div key={index} className='flex flex-col items-center gap-2 group cursor-default'>
                            <div
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-sm sm:text-lg border-2 sm:border-[3px] transition-all duration-500 transform
                  ${isActive
                                        ? 'bg-white border-purple-600 text-purple-600 shadow-xl shadow-purple-200 scale-110'
                                        : isCompleted
                                            ? 'bg-blue-500 border-transparent text-white shadow-md'
                                            : 'bg-white border-gray-200 text-gray-300'
                                    }
                `}
                            >
                                {isCompleted ? (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : stepNumber}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-black uppercase tracking-tighter sm:tracking-wider transition-colors duration-500 ${isActive ? 'text-purple-600' : isCompleted ? 'text-gray-700' : 'text-gray-300'}`}>
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
