import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaSpinner } from 'react-icons/fa'

export default function Auth() {
  const router = useRouter()
  const { returnUrl } = router.query
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)

  const {
    signInEmailPassword,
    isLoading: isSignInLoading,
    isSuccess: isSignInSuccess,
    isError: isSignInError,
    error: signInError,
  } = useSignInEmailPassword()

  const {
    signUpEmailPassword,
    isLoading: isSignUpLoading,
    isSuccess: isSignUpSuccess,
    isError: isSignUpError,
    error: signUpError,
  } = useSignUpEmailPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignIn) {
      await signInEmailPassword(email, password)
    } else {
      await signUpEmailPassword(email, password)
    }
  }

  useEffect(() => {
    if (isSignInSuccess || isSignUpSuccess) {
      if (typeof returnUrl === 'string' && returnUrl.startsWith('/')) {
        router.push(returnUrl)
      } else {
        router.push('/')
      }
    }
  }, [isSignInSuccess, isSignUpSuccess, returnUrl, router])

  const isLoading = isSignInLoading || isSignUpLoading
  const error = signInError || signUpError

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {(isSignInError || isSignUpError) && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error?.message || 'An error occurred during authentication'}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <FaSpinner className="h-5 w-5 animate-spin" />
              ) : (
                <span>{isSignIn ? 'Sign in' : 'Sign up'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
