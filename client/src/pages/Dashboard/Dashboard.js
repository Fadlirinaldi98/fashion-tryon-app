import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Videos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Videos</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalVideos}</p>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
          </div>

          {/* Total Clicks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalClicks}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-pink-600">${stats.totalRevenue}</p>
          </div>

          {/* Conversions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Conversions</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalConversions}</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}</p>
          </div>

          {/* Affiliate Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Affiliate Links</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.affiliateLinksCount}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/videos/upload"
            className="bg-pink-600 text-white rounded-lg shadow-md p-6 hover:bg-pink-700 transition text-center"
          >
            <p className="text-2xl mb-2">🎬</p>
            <p className="font-semibold">Upload Video</p>
          </a>
          <a
            href="/affiliate"
            className="bg-blue-600 text-white rounded-lg shadow-md p-6 hover:bg-blue-700 transition text-center"
          >
            <p className="text-2xl mb-2">💰</p>
            <p className="font-semibold">Manage Affiliate Links</p>
          </a>
          <a
            href="/analytics"
            className="bg-green-600 text-white rounded-lg shadow-md p-6 hover:bg-green-700 transition text-center"
          >
            <p className="text-2xl mb-2">📊</p>
            <p className="font-semibold">View Analytics</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
