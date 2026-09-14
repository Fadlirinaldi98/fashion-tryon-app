import React from 'react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Showcase Fashion dengan Video Try-On 👗
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Platform revolusioner untuk content creator dan affiliate marketer fashion. Buat video try-on yang engaging, track performance, dan dapatkan penghasilan.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-semibold">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 font-semibold">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Video Try-On</h3>
              <p className="text-gray-600">
                Upload dan edit video try-on produk fashion dengan tools yang mudah digunakan.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Affiliate Marketing</h3>
              <p className="text-gray-600">
                Generate affiliate links dan track earnings secara real-time dengan dashboard analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Monitor views, clicks, conversions, dan ROI dari setiap video yang Anda upload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Mulai Monetisasi Konten Fashion Anda</h2>
          <p className="text-xl mb-8">Bergabunglah dengan ribuan content creator yang sudah menghasilkan passive income.</p>
          <button className="px-8 py-3 bg-white text-pink-600 rounded-lg hover:bg-gray-100 font-semibold">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
