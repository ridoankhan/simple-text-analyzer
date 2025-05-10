import api from './api'
import { AuthResponse, User } from '../types'

class AuthService {
  async getAuthStatus(): Promise<AuthResponse> {
    return api.get<AuthResponse>('/auth/status')
  }

  async logout(): Promise<void> {
    try {
      await api.get('/auth/logout')
    } finally {
      localStorage.removeItem('token')
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  setToken(token: string): void {
    console.log('Storing token:', token)
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}

export default new AuthService()
