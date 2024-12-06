import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)

  const { signInEmailPassword, isLoading: isSignInLoading, isSuccess: isSignInSuccess, isError: isSignInError, error: signInError } = useSignInEmailPassword()
  const { signUpEmailPassword, isLoading: isSignUpLoading, isSuccess: isSignUpSuccess, isError: isSignUpError, error: signUpError } = useSignUpEmailPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignIn) {
      await signInEmailPassword(email, password)
    } else {
      await signUpEmailPassword(email, password)
    }
  }

  if (isSignInSuccess || isSignUpSuccess) {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {(isSignInError || isSignUpError) && (
            <div className="text-red-500 text-sm">
              {signInError?.message || signUpError?.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSignInLoading || isSignUpLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignInLoading || isSignUpLoading ? 'Loading...' : isSignIn ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
