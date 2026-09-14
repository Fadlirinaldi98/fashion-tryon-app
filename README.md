# Fashion Try-On App 👗🎥

Aplikasi Video Try-On Produk Fashion dengan fitur AI, Analytics, dan Affiliate Marketing.

## Fitur Utama

✨ **Video Try-On**
- Upload video try-on produk fashion
- Edit dan customize video dengan effects
- Template untuk berbagai jenis produk

🤖 **AI-Powered Features**
- Auto-tagging produk
- Scene detection
- Recommendation engine

📊 **Analytics & Insights**
- Track video performance
- Monitor engagement metrics
- Affiliate link tracking

💰 **Affiliate Management**
- Generate affiliate links
- Commission tracking
- Partner dashboard

🛒 **E-Commerce Integration**
- Direct product links
- Inventory management
- Order tracking

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB
- Cloudinary (Video Storage)
- JWT Authentication

### Frontend
- React.js
- TailwindCSS
- Redux
- FFmpeg (Video Processing)

## Installation

### Prerequisites
- Node.js v14+
- MongoDB
- Cloudinary Account

### Setup

1. Clone repository
```bash
git clone https://github.com/Fadlirinaldi98/fashion-tryon-app.git
cd fashion-tryon-app
```

2. Setup Backend
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm install
npm run dev
```

3. Setup Frontend
```bash
cd client
npm install
npm start
```

4. Server berjalan di http://localhost:5000
5. Frontend berjalan di http://localhost:3000

## Project Structure

```
fashion-tryon-app/
├── server.js
├── config/
│   ├── database.js
│   └── cloudinary.js
├── routes/
│   ├── auth.js
│   ├── videos.js
│   ├── products.js
│   ├── analytics.js
│   └── affiliate.js
├── controllers/
├── models/
├── middleware/
├── utils/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/:id` - Get video detail
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Analytics
- `GET /api/analytics/videos/:id` - Get video analytics
- `GET /api/analytics/dashboard` - Get dashboard stats

### Affiliate
- `GET /api/affiliate/links` - Get affiliate links
- `POST /api/affiliate/generate` - Generate new link
- `GET /api/affiliate/earnings` - Get earnings

## Environment Variables

Lihat `.env.example` untuk daftar lengkap variable yang diperlukan.

## Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - lihat file LICENSE untuk detail

## Support

Jika ada pertanyaan atau issue, silakan buat GitHub Issue atau hubungi kami.

---

**Made with ❤️ by Fadlirinaldi98**
