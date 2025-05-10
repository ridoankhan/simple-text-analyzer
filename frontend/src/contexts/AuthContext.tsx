import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication status on app load
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          const authResponse = await authService.getAuthStatus();
          setUser(authResponse.user);
          // Refresh token
          authService.setToken(authResponse.token);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Session expired. Please login again.');
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed. Please try again.');
    }
  };
  
  const value = {
    user,
    loading,
    error,
    setUser,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};