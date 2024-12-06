import Link from 'next/link'
import { FaGithub, FaTwitter, FaDiscord, FaMicrophone } from 'react-icons/fa'

export default function Footer() {
  const navigation = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Documentation', href: '/docs' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'API Status', href: '/status' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com',
        icon: FaGithub,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: FaTwitter,
      },
      {
        name: 'Discord',
        href: 'https://discord.com',
        icon: FaDiscord,
      },
    ],
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <FaMicrophone className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-600">VoiceScene</span>
            </Link>
            <p className="text-gray-500 text-base">
              Transform your stories into immersive audio experiences with AI-powered voice generation.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} VoiceScene. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
