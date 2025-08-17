'use client'

import { LoginForm } from '@/components/login-form'
import { redirect, useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  function redirectToApp() {
    router.push('/')
  }
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 p-4'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='w-32 h-9 bg-amber-200 cursor-pointer'
            onClick={redirectToApp}
          >
            go to app
          </div>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-violet-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
        </div>

        <div className='w-full max-w-md relative z-10'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent'>
              Welcome Back
            </h1>
            <p className='text-violet-300/80 mt-2 text-lg'>
              Sign in to your account
            </p>
          </div>

          <div className='bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-violet-700/50 p-8'>
            <LoginForm />
          </div>

          <p className='text-center text-violet-400/60 text-sm mt-6'>
            Secure • Fast • Reliable
          </p>
        </div>
      </div>
    </>
  )
}
