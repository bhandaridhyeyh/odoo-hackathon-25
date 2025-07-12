
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/utils/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('rewear_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await API.get('/users/me');
      setUser(response.data);
      console.log('User fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('rewear_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await API.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('rewear_token', token);
      setUser(user);
      console.log('Login successful, navigating to home');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData: any) => {
    try {
      console.log('Attempting registration with:', userData);
      const response = await API.post('/auth/register', userData);
      const { user, token } = response.data;
      
      localStorage.setItem('rewear_token', token);
      setUser(user);
      console.log('Registration successful, navigating to home');
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('rewear_token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
