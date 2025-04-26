import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-200 transition duration-300"
        >
          RBAC Blog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-200 transition duration-200 font-medium"
          >
            Home
          </Link>

          {/* Show these links only if user is logged in */}
          {currentUser ? (
            <>
              {/* Admin-only links */}
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="hover:text-blue-200 transition duration-200 font-medium"
                >
                  Dashboard
                </Link>
              )}

              {/* User profile/info with dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-md transition duration-200"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="font-medium">{currentUser.name}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-10 transform transition duration-200 ring-1 ring-black ring-opacity-5">
                    {isAdmin() && (
                      <Link
                        to="/admin/posts/create"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-150"
                        onClick={() => setIsOpen(false)}
                      >
                        Create Post
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-100 hover:text-white transition duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
