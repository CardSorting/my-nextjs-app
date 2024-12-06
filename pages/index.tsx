import { useAuthenticationStatus } from '@nhost/nextjs'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { FaMicrophone, FaRobot, FaTheaterMasks, FaDownload } from 'react-icons/fa'

export default function Home() {
  const { isAuthenticated } = useAuthenticationStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Transform Text into </span>
                  <span className="block text-indigo-600 xl:inline">Immersive Audio Scenes</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create captivating audio narratives with AI-powered voice generation. Turn your stories into rich, multi-character audio experiences with just a few clicks.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!isAuthenticated ? (
                    <div className="rounded-md shadow">
                      <Link
                        href="/auth"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Start Creating
                      </Link>
                    </div>
                  ) : (
                    <div className="rounded-md shadow">
                      <Link
                        href="/scenes"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        My Scenes
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Bring Your Stories to Life
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Create immersive audio experiences with our powerful AI-driven tools and natural-sounding voices.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'AI Voice Generation',
                  description: 'High-quality, natural-sounding voices powered by advanced AI technology.',
                  icon: FaRobot
                },
                {
                  title: 'Multi-Character Scenes',
                  description: 'Create dynamic dialogues with multiple characters and unique voices.',
                  icon: FaTheaterMasks
                },
                {
                  title: 'Voice Customization',
                  description: 'Fine-tune voice characteristics to match your characters perfectly.',
                  icon: FaMicrophone
                },
                {
                  title: 'Easy Export',
                  description: 'Download your audio scenes in high-quality formats for any use.',
                  icon: FaDownload
                }
              ].map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to create your first scene?</span>
            <span className="block text-indigo-600">Get started in minutes.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {!isAuthenticated ? (
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/scenes"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Create New Scene
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
