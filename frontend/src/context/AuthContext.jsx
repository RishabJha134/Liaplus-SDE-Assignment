import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (token) {
          // Set default auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Fetch current user
          const response = await axios.get("http://localhost:5000/api/auth/me");

          if (response.data.success) {
            setCurrentUser(response.data.user);
          } else {
            // Clear invalid token
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
          }
        }
      } catch (err) {
        console.error("Auth check error:", err);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );

      if (response.data.success) {
        const { token, user } = response.data;

        // Save token and set user
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setCurrentUser(user);

        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );

      if (response.data.success) {
        const { token, user } = response.data;

        // Save token and set user
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setCurrentUser(user);

        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Context value
  const contextValue = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
