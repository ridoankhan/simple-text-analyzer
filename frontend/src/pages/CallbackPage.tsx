import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CallbackPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    console.log('Extracted Token in CallbackPage:', token) // Debugging the token

    if (token) {
      localStorage.setItem('token', token) // Store the token
      console.log('Token stored successfully') // Confirm token storage
      navigate('/dashboard') // Redirect to the dashboard
    } else {
      console.error('Token is missing in the URL')
      navigate('/login?error=missing_token') // Redirect to login if token is missing
    }
  }, [navigate])

  return <p>Redirecting...</p>
}

export default CallbackPage
