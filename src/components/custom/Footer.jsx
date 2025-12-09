import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    alert('Thanks for subscribing! 🎉')
    setEmail('')
  }

  return (
    <footer className='relative w-full bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden opacity-20'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob'></div>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16'>
        {/* Newsletter Section */}
        <div className='mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='text-4xl font-black mb-3 flex items-center gap-3'>
                <span>📧</span>
                <span>Stay Updated</span>
              </h3>
              <p className='text-xl text-white/80'>
                Get travel tips, destination guides, and exclusive deals delivered to your inbox
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className='flex gap-3'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium'
                required
              />
              <button
                type='submit'
                className='px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300'
              >
                Subscribe 🚀
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Company Info */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <img src='/logo.png' alt='Logo' className='h-12 w-auto' onError={(e) => { e.target.src = '/vite.svg' }} />
            </div>
            <p className='text-white/80 leading-relaxed font-medium'>
              🌍 AI-powered travel planning that makes your dream trips a reality. Plan smarter, travel better.
            </p>
            <div className='flex gap-4'>
              <a href='#' className='w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 text-2xl'>
                📘
              </a>
              <a href='#' className='w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 text-2xl'>
                🐦
              </a>
              <a href='#' className='w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 text-2xl'>
                📷
              </a>
              <a href='#' className='w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 text-2xl'>
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-xl font-black mb-6 flex items-center gap-2'>
              <span>🔗</span>
              <span>Quick Links</span>
            </h4>
            <ul className='space-y-3'>
              <li>
                <Link to='/' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/create-trip' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Create Trip
                </Link>
              </li>
              <li>
                <Link to='/my-trips' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  My Trips
                </Link>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className='text-xl font-black mb-6 flex items-center gap-2'>
              <span>🌎</span>
              <span>Popular Destinations</span>
            </h4>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>🗼</span>
                  Paris, France
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>🗾</span>
                  Tokyo, Japan
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>🏝️</span>
                  Bali, Indonesia
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>🗽</span>
                  New York, USA
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-xl font-black mb-6 flex items-center gap-2'>
              <span>💬</span>
              <span>Support</span>
            </h4>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2 group'>
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-white/20'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-white/60 font-medium'>
              © 2024 AI Travel Planner. Made with ❤️ for travelers worldwide
            </p>
            <div className='flex gap-6'>
              <a href='#' className='text-white/60 hover:text-white font-medium transition-colors duration-300'>
                Privacy
              </a>
              <a href='#' className='text-white/60 hover:text-white font-medium transition-colors duration-300'>
                Terms
              </a>
              <a href='#' className='text-white/60 hover:text-white font-medium transition-colors duration-300'>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
