import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
