import { useUserData } from '@nhost/nextjs'
import ProtectedRoute from '../components/ProtectedRoute'
import Layout from '../components/Layout'
import { FaUser, FaPlay, FaClock, FaStar } from 'react-icons/fa'

export default function Dashboard() {
  const user = useUserData()

  const stats = [
    { name: 'Total Scenes', value: '12', icon: FaPlay },
    { name: 'Last Played', value: '2 hours ago', icon: FaClock },
    { name: 'Favorites', value: '3', icon: FaStar },
  ]

  return (
    <ProtectedRoute>
      <Layout>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            
            <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {/* User Profile Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-indigo-500 rounded-md">
                      <FaUser className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-indigo-500 rounded-md">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3].map((item) => (
                    <li key={item}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            Scene Title {item}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Played
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <FaClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {item} hour ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
