import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen } from 'lucide-react'

const LoginPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) {
      interface LocationState {
        from?: {
          pathname?: string
        }
      }
      const from =
        (location.state as LocationState)?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }, [user, navigate, location])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('token', token) // Store the token
      navigate('/dashboard') // Redirect to the dashboard
    }
  }, [location, navigate])

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:3000/api/v1/auth/google'
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <BookOpen className='h-12 w-12 text-blue-500' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Text Analyzer
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Analyze your text with powerful tools
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='flex flex-col space-y-4'>
            <p className='text-sm text-gray-700 text-center mb-4'>
              Sign in to access your text analysis tools
            </p>

            <button
              onClick={handleGoogleLogin}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <svg className='h-5 w-5 mr-2' viewBox='0 0 24 24'>
                <path
                  fill='#FFFFFF'
                  d='M12.545 12.151L12.545 12.151L12.545 12.151H7.818v2.286h2.733c-.254 1.285-1.486 2.286-2.733 2.286-1.657 0-3-1.343-3-3s1.343-3 3-3c.762 0 1.376.3 1.857.7l1.714-1.714C10.404 8.767 9.13 8 7.818 8 5.033 8 2.818 10.215 2.818 13s2.215 5 5 5c2.886 0 4.894-2.035 4.894-5 0-.282-.037-.527-.084-.85z'
                ></path>
                <path
                  fill='#FFFFFF'
                  d='M12.545 12.151L12.545 12.151L12.545 12.151H7.818v2.286h2.733c-.254 1.285-1.486 2.286-2.733 2.286-1.657 0-3-1.343-3-3s1.343-3 3-3c.762 0 1.376.3 1.857.7l1.714-1.714C10.404 8.767 9.13 8 7.818 8 5.033 8 2.818 10.215 2.818 13s2.215 5 5 5c2.886 0 4.894-2.035 4.894-5 0-.282-.037-.527-.084-.85z'
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
