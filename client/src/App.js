import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import UploadVideo from './pages/Videos/UploadVideo';
import VideoLibrary from './pages/Videos/VideoLibrary';
import VideoDetail from './pages/Videos/VideoDetail';
import AffiliateLinks from './pages/Affiliate/AffiliateLinks';
import Analytics from './pages/Analytics/Analytics';
import Products from './pages/Products/Products';
import Profile from './pages/Profile/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            
            {/* Protected Routes */}
            {isLoggedIn && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/videos/upload" element={<UploadVideo />} />
                <Route path="/videos" element={<VideoLibrary />} />
                <Route path="/videos/:id" element={<VideoDetail />} />
                <Route path="/affiliate" element={<AffiliateLinks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/products" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
