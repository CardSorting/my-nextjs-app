import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push({
        pathname: '/auth',
        query: { returnUrl: router.asPath },
      })
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-8 w-8 mx-auto animate-spin text-indigo-600" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to access this page</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
