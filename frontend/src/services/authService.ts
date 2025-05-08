import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

export interface AuthResponse {
  authenticated: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
}

export const authService = {
  async getAuthStatus(): Promise<AuthResponse> {
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/status`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return { authenticated: false };
    }
  },

  async logout(): Promise<void> {
    await axios.get(`${API_URL}/api/v1/auth/logout`, {
      withCredentials: true
    });
  }
};