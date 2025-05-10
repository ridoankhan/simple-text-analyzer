import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TextAnalysisPage from './pages/TextAnalysisPage'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/authService'
import CallbackPage from './pages/CallbackPage'

const App: React.FC = () => {
  useEffect(() => {
    const url = new URL(window.location.href)
    console.log('Full URL:', url.href)
    const params = new URLSearchParams(url.search)
    console.log('Search Params:', params.toString())
    const token = params.get('token')
    console.log('Extracted Token:', token)

    if (token) {
      authService.setToken(token)
      console.log('Token stored successfully')

      window.history.replaceState(null, '', '/dashboard')
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/callback' element={<CallbackPage />} />
            <Route path='/texts/:id/analyze' element={<TextAnalysisPage />} />
          </Route>

          {/* Redirect root to dashboard or login */}
          <Route path='/' element={<Navigate to='/dashboard' replace />} />

          {/* Error routes */}
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
