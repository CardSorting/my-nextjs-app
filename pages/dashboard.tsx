import { useUserData } from '@nhost/nextjs'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const user = useUserData()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* User Profile Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="mt-1 text-lg text-gray-900">{user?.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                      <div className="mt-4 space-y-4">
                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Update Profile
                        </button>
                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Settings
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
                      <dl className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                          <dd className="text-sm text-gray-900">Just Now</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                          <dd className="text-sm text-gray-900">Today</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
