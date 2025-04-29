const API_URL = 'http://localhost:8000';

// Main API object that groups all authentication and user-related requests
export const api = {
  auth: {
    // Auth method: login with username and password
    login: async ({ username, password }) => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }
      
      return response.json();
    },

    // Auth method: register a new user with their data
    register: async (userData) => {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }
      
      return response.json();
    },

    // Auth method: logout the current user
    logout: async () => {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Logout failed');
      }
      
      return response.json();
    }
  },

  user: {
    // Fetches full details of a user given their ID
    getDetails: async (userId) => {
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Error fetching user details');
      return response.json();
    },

    // Fetches current statistics for the user (e.g., health data, activities)
    getCurrentStats: async (userId) => {
      const response = await fetch(`${API_URL}/dashboard/${userId}/current`);
      if (!response.ok) throw new Error('Error fetching current statistics');
      return response.json();
    },

    // Fetches the user's historical data based on a metric and a period
    getHistory: async (userId, metric, period) => {
      const response = await fetch(
        `${API_URL}/dashboard/${userId}/history?metric=${metric}&period=${period}`
      );
      if (!response.ok) throw new Error('Error fetching history');
      return response.json();
    },

    // Imports user data (like fitness records, health metrics, etc.)
    importData: async (userId, type, data) => {
      const response = await fetch(`${API_URL}/users/${userId}/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ import_type: type, data }),
      });
      
      if (!response.ok) throw new Error('Error importing data');
      return response.json();
    },

    // Updates the user's profile information
    updateProfile: async (userId, data) => {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Error updating profile');
      return response.json();
    },
  }
};
