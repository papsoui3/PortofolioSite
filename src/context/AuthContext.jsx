import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true
  });

  const navigate = useNavigate();

  // Always send credentials (cookies, etc.)
  axios.defaults.withCredentials = true;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    checkAuthStatus();
    // Optionally, add listener to check auth on tab focus:
    window.addEventListener('focus', checkAuthStatus);
    return () => window.removeEventListener('focus', checkAuthStatus);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/check-auth`);
      setAuthState({
        isAuthenticated: res.data.isAuthenticated,
        isAdmin: res.data.isAdmin,
        isLoading: false
      });
    } catch (err) {
      setAuthState({
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false
      });
    }
  };

  const login = async (username, password) => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      await checkAuthStatus();
      return { success: true };
    } catch (err) {
      console.error('Login error:', err.response?.data);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
      setAuthState({
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false
      });
      navigate('/admin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        ...authState,
        login,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
