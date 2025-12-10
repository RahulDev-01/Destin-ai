import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'sonner'

function Newsletter() {
    const [email, setEmail] = useState('')

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email address')
            return
        }
        toast.success('Thanks for subscribing! 📬')
        setEmail('')
    }

    return (
        <section className='relative w-full py-24'>
            <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
                <div className='relative bg-gray-900 rounded-[3rem] overflow-hidden p-12 md:p-24 text-center'>
                    {/* Background decorations */}
                    <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
                        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob'></div>
                        <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000'></div>
                    </div>

                    <div className='relative z-10 max-w-3xl mx-auto space-y-8'>
                        <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20'>
                            <span className='text-xl'>📩</span>
                            <span className='font-bold text-white'>Travel Weekly</span>
                        </div>

                        <h2 className='text-4xl md:text-6xl font-black text-white tracking-tight'>
                            Get Weekly Travel Inspiration
                        </h2>

                        <p className='text-xl text-gray-300 leading-relaxed'>
                            Join 50,000+ travelers getting the best deals, hidden gems, and travel hacks delivered to their inbox every week.
                        </p>

                        <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4'>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="h-16 px-6 text-lg rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:bg-white/20 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" className="h-16 px-8 text-lg font-bold rounded-2xl bg-white text-gray-900 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                                Subscribe
                            </Button>
                        </form>

                        <p className='text-sm text-gray-500'>
                            No spam, ever. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
