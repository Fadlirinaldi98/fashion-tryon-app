import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBars3, FiX } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-pink-600">
              👗 FashionTryOn
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-pink-600">
                  Dashboard
                </Link>
                <Link to="/videos" className="text-gray-700 hover:text-pink-600">
                  Videos
                </Link>
                <Link to="/affiliate" className="text-gray-700 hover:text-pink-600">
                  Affiliate
                </Link>
                <Link to="/analytics" className="text-gray-700 hover:text-pink-600">
                  Analytics
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-pink-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiBars3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/videos"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Videos
                </Link>
                <Link
                  to="/affiliate"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Affiliate
                </Link>
                <Link
                  to="/analytics"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Analytics
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-pink-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
