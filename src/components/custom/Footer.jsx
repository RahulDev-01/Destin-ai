import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='w-full bg-white border-t'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-3'>
            <img src='/logo.png' alt='Destin AI' className='h-8 w-auto transition-transform duration-200 hover:scale-105'/>
            <span className='text-sm text-gray-600'>Plan smarter, travel better.</span>
          </div>

          <nav className='flex items-center gap-6 text-sm text-gray-600'>
            <Link to='/create-trip' className='transition-colors hover:text-gray-900 hover:underline underline-offset-4'>Create Trip</Link>
            <Link to='/my-trips' className='transition-colors hover:text-gray-900 hover:underline underline-offset-4'>My Trips</Link>
            <a href='https://github.com/' target='_blank' className='transition-colors hover:text-gray-900 hover:underline underline-offset-4' rel='noreferrer'>GitHub</a>
          </nav>
        </div>

        <div className='mt-6 text-xs text-gray-500 text-center sm:text-left'>
          © {new Date().getFullYear()} Destin AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
