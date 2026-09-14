import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-pink-600 mb-4">👗 FashionTryOn</h3>
            <p className="text-gray-400">
              Platform video try-on fashion dengan fitur affiliate marketing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-pink-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-pink-600">
                  Videos
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-pink-600">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="hover:text-pink-600">
                  Affiliate
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-pink-600">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-pink-600">
                Twitter
              </a>
              <a href="#" className="hover:text-pink-600">
                Instagram
              </a>
              <a href="#" className="hover:text-pink-600">
                TikTok
              </a>
              <a href="#" className="hover:text-pink-600">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {currentYear} FashionTryOn. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
              <a href="#" className="hover:text-pink-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-pink-600">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
