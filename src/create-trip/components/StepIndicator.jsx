import React from 'react'

function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className='w-full mb-8'>
            <div className='flex items-center justify-between relative'>
                {/* Progress Bar Background */}
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10'></div>

                {/* Active Progress Bar */}
                <div
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500 ease-in-out'
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>

                {[...Array(totalSteps)].map((_, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep

                    return (
                        <div key={index} className='flex flex-col items-center gap-2'>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-300
                  ${isActive
                                        ? 'bg-blue-600 border-blue-200 text-white scale-110 shadow-lg'
                                        : isCompleted
                                            ? 'bg-green-500 border-green-200 text-white'
                                            : 'bg-white border-gray-200 text-gray-400'
                                    }
                `}
                            >
                                {isCompleted ? '✓' : stepNumber}
                            </div>
                            <span className={`text-xs font-semibold hidden md:block ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
                                {stepNumber === 1 && 'Where'}
                                {stepNumber === 2 && 'When'}
                                {stepNumber === 3 && 'Budget'}
                                {stepNumber === 4 && 'Who'}
                                {stepNumber === 5 && 'Review'}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StepIndicator
