import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function PricingSection() {
    const plans = [
        {
            name: 'Free Starter',
            price: '$0',
            period: '/forever',
            description: 'Perfect for planning your next vacation',
            features: [
                'AI Trip Generation (3/day)',
                'Basic Itineraries',
                'Hotel Recommendations',
                'Public Trip Sharing',
                'Community Support'
            ],
            buttonText: 'Start Free',
            popular: false,
            gradient: 'from-gray-100 to-gray-200'
        },
        {
            name: 'Pro Explorer',
            price: '$9.99',
            period: '/month',
            description: 'For frequent travelers who want more',
            features: [
                'Unlimited AI Trips',
                'Advanced Itineraries',
                'Real-time Flight Prices',
                'Offline Maps Export',
                'Priority Support',
                'Ad-free Experience'
            ],
            buttonText: 'Go Pro',
            popular: true,
            gradient: 'from-purple-600 to-pink-600'
        },
        {
            name: 'Lifetime',
            price: '$199',
            period: '/one-time',
            description: 'The ultimate toolkit for travel lovers',
            features: [
                'Everything in Pro',
                'Lifetime Access',
                'Exclusive Travel Deals',
                'Beta Features Access',
                'Dedicated Travel Agent',
                'Custom Branding'
            ],
            buttonText: 'Get Lifetime',
            popular: false,
            gradient: 'from-yellow-400 to-orange-500'
        }
    ]

    return (
        <section className='relative w-full py-24 md:py-32 bg-white overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
                <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
            </div>

            <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-4'>
                        Simple, Transparent Pricing
                    </h2>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Start for free and upgrade as you go. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className='grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto'>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-2
                ${plan.popular
                                    ? 'border-purple-600 shadow-2xl scale-105 z-10'
                                    : 'border-gray-100 shadow-xl hover:shadow-2xl'
                                }
              `}
                        >
                            {plan.popular && (
                                <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg'>
                                    MOST POPULAR
                                </div>
                            )}

                            <div className='text-center mb-8'>
                                <h3 className='text-xl font-bold text-gray-600 mb-2'>{plan.name}</h3>
                                <div className='flex items-baseline justify-center gap-1'>
                                    <span className='text-5xl font-black text-gray-900'>{plan.price}</span>
                                    <span className='text-gray-500 font-medium'>{plan.period}</span>
                                </div>
                                <p className='text-gray-500 mt-4'>{plan.description}</p>
                            </div>

                            <div className='space-y-4 mb-8'>
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className='flex items-center gap-3'>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                                            ✓
                                        </div>
                                        <span className='text-gray-700 font-medium'>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to='/create-trip'>
                                <Button
                                    className={`w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105
                    ${plan.popular
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/50'
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                        }
                  `}
                                >
                                    {plan.buttonText}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingSection
