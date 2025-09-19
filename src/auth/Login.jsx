import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSEO } from '@/lib/seo'

function Login() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/my-trips'

  useSEO({
    title: 'Sign in | Destin AI',
    description: 'Sign in with Google to save and view your AI-generated trip itineraries.',
    image: '/hero.png',
  })

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      try {
        const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json',
          },
        })
        localStorage.setItem('user', JSON.stringify(resp.data))
        window.dispatchEvent(new Event('authChanged'))
        navigate(next, { replace: true })
      } catch (e) {
        console.error('Login failed', e)
      }
    },
    onError: (error) => console.log(error),
  })

  return (
    <main className='min-h-[80vh] flex items-center justify-center px-6'>
      <div className='w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm'>
        <div className='flex flex-col items-center text-center'>
          <img src='/logo.png' alt='Destin AI' className='h-16 w-auto mb-4' />
          <h1 className='text-3xl font-extrabold tracking-tight'>Welcome back</h1>
          <p className='mt-2 text-gray-600'>Sign in to save trips, access your itineraries, and plan faster with AI.</p>
        </div>

        <div className='mt-8 space-y-4'>
          <Button onClick={login} className='w-full h-12 flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white'>
            <FcGoogle className='h-6 w-6' />
            Continue with Google
          </Button>
        </div>

        <div className='mt-6 text-xs text-gray-500 text-center'>
          By continuing, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </main>
  )
}

export default Login
