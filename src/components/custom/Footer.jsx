import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='relative w-full bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000'></div>

      <div className='relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          {/* Brand Column */}
          <div className='md:col-span-2'>
            <div className='flex items-center gap-3 mb-4'>
              <img src='/logo.png' alt='AI Travel Planner' className='h-10 w-auto' onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <span className='text-2xl font-bold gradient-text-warm'>AI Travel Planner</span>
            </div>
            <p className='text-gray-400 mb-6 max-w-md'>
              Your personal trip planner powered by AI. Create custom itineraries tailored to your interests, time, and budget in seconds.
            </p>

            {/* Social Links */}
            <div className='flex items-center gap-4'>
              <a href='https://twitter.com' target='_blank' rel='noreferrer' className='w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110'>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
              <a href='https://facebook.com' target='_blank' rel='noreferrer' className='w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110'>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a href='https://instagram.com' target='_blank' rel='noreferrer' className='w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110'>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' />
                </svg>
              </a>
              <a href='https://github.com' target='_blank' rel='noreferrer' className='w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110'>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/create-trip' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  Create Trip
                </Link>
              </li>
              <li>
                <Link to='/my-trips' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Resources</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='mailto:support@example.com' className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'>
                  <span className='w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8'></div>

        {/* Bottom Bar */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400'>
          <p>© {new Date().getFullYear()} AI Travel Planner. All rights reserved.</p>
          <p className='flex items-center gap-2'>
            Made with
            <svg className='h-4 w-4 text-pink-500 animate-pulse' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
            </svg>
            by AI Travel Team
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
