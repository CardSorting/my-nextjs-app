import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/nextjs'
import Link from 'next/link'
import { useState } from 'react'
import { FaMicrophone, FaBookOpen, FaUser, FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const { isAuthenticated } = useAuthenticationStatus()
  const user = useUserData()
  const { signOut } = useSignOut()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Create Scene', href: '/scenes', icon: FaMicrophone },
    { name: 'My Library', href: '/dashboard', icon: FaBookOpen },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FaMicrophone className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-600">VoiceScene</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated && (
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{user?.email}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <FaUser className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="block bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
