import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

// Create an empty context that we will use to share the authentication state
const AuthContext = createContext(null);

// AuthProvider is the component that wraps our app and provides the authentication logic
export const AuthProvider = ({ children }) => {
  // State to store user info, with special initialization:
  // It checks if there is a userId in localStorage when the page loads
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem('userId');
    return userId ? { id: userId } : null;
  });
  // New state to store the user's full details
  const [userDetails, setUserDetails] = useState(null);
  
  const navigate = useNavigate();

  // Effect to load user details when we have an id
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        try {
          const details = await api.user.getDetails(user.id);
          setUserDetails(details);
        } catch (error) {
          console.error('Error loading user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [user?.id]);

  // Login function: receives credentials, calls the API, and handles the result
  const login = async (username, password) => {
    try {
      // Calls the login endpoint using our api.js
      const data = await api.auth.login({ username, password });
      const userId = data.user_id;
      
      // If login is successful:
      // 1. Save the userId in localStorage (persistence)
      // 2. Update the user state
      // 3. Navigate to the dashboard
      localStorage.setItem('userId', userId);
      setUser({ id: userId });
      navigate('/dashboard');
      
      return { success: true };
    } catch (error) {
      // If there is an error, return the message to display it in the UI
      return { success: false, error: error.message };
    }
  };

  // Register function: similar to login but with more data
  const register = async (userData) => {
    try {
      await api.auth.register(userData);
      // If registration is successful, navigate to login with a success message
      navigate('/login', { 
        state: { message: 'Registration successful!' }
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function: clears the state and storage
  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Even if the API call fails, always:
      // 1. Clear localStorage
      // 2. Reset user state and details
      // 3. Redirect to login
      localStorage.removeItem('userId');
      setUser(null);
      setUserDetails(null);
      navigate('/login');
    }
  };

  // Provides all auth functions and full user data to child components
  return (
    <AuthContext.Provider value={{ 
      user: { ...user, ...userDetails }, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the context in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  // If try to use useAuth outside the Provider, throw an error
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
