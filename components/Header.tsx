import Link from 'next/link'
import { getSession } from '@/lib/auth'
import UserMenu from './UserMenu'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
            </svg>
            <span className="text-xl font-bold text-primary">Airbnb Clone</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Properties
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            
            {session ? (
              <UserMenu session={session} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}