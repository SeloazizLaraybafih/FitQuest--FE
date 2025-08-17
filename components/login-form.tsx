'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Email login:', { email, password })
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Google login initiated')
    setIsLoading(false)
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2 text-center'>
        <h2 className='text-2xl font-semibold text-violet-200'>Sign In</h2>
        <p className='text-violet-300/80'>
          Enter your email and password to access your account
        </p>
      </div>

      <div className='space-y-4'>
        <form onSubmit={handleEmailLogin} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-violet-300 font-medium'>
              Email
            </Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 h-4 w-4 text-violet-400' />
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10 border-violet-600 focus:border-violet-400 focus:ring-violet-400/20 bg-slate-700/50 text-violet-100 placeholder:text-violet-400/60'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password' className='text-violet-300 font-medium'>
              Password
            </Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-4 w-4 text-violet-400' />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='pl-10 pr-10 border-violet-600 focus:border-violet-400 focus:ring-violet-400/20 bg-slate-700/50 text-violet-100 placeholder:text-violet-400/60'
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-violet-700/30'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-violet-400' />
                ) : (
                  <Eye className='h-4 w-4 text-violet-400' />
                )}
              </Button>
            </div>
          </div>

          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator className='w-full bg-violet-600' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-slate-800 px-2 text-violet-300/70'>
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type='button'
          variant='outline'
          className='w-full bg-slate-700/50 border-violet-600 hover:bg-violet-700/30 hover:border-violet-500 text-violet-200 shadow-sm hover:shadow-md transition-all duration-200'
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <svg className='mr-2 h-4 w-4 text-violet-400' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          {isLoading ? 'Connecting...' : 'Continue with Google'}
        </Button>

        <div className='text-center text-sm'>
          <span className='text-violet-300/70'>Don't have an account? </span>
          <Button
            variant='link'
            className='p-0 h-auto font-medium text-violet-400 hover:text-violet-300 underline-offset-4'
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}
