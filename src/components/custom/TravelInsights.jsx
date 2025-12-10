import React from 'react'
import { Button } from '../ui/button'

function TravelInsights() {
    const articles = [
        {
            category: 'Tips & Tricks',
            title: '10 Hacking Travel Tips You Need To Know',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
            readTime: '5 min read',
            date: 'Dec 12, 2024'
        },
        {
            category: 'Destinations',
            title: 'Hidden Gems of Europe: Beyond the Tourist Trail',
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
            readTime: '8 min read',
            date: 'Dec 10, 2024'
        },
        {
            category: 'Food & Culture',
            title: 'A Culinary Journey Through Southeast Asia',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            readTime: '6 min read',
            date: 'Dec 08, 2024'
        }
    ]

    return (
        <section className='relative w-full py-24 bg-gray-50'>
            <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                    <div className='space-y-4'>
                        <div className='inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full'>
                            <span className='text-sm font-bold text-green-700'>NEW BLOG POSTS</span>
                        </div>
                        <h2 className='text-4xl md:text-5xl font-black text-gray-900'>
                            Travel Insights 📚
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl'>
                            Expert advice, destination guides, and travel inspiration to help you plan better.
                        </p>
                    </div>
                    <Button variant="outline" className="border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all duration-300">
                        View All Articles →
                    </Button>
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className='group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer'
                        >
                            <div className='relative h-64 overflow-hidden'>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                />
                                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-900 shadow-lg'>
                                    {article.category}
                                </div>
                            </div>

                            <div className='p-8 space-y-4'>
                                <div className='flex items-center gap-4 text-sm text-gray-500 font-medium'>
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className='text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2'>
                                    {article.title}
                                </h3>

                                <div className='pt-4 flex items-center gap-2 text-purple-600 font-bold opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
                                    Read More <span>→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TravelInsights
