# LawConnect - Full Stack Lawyer Consultation Platform

A modern full-stack web application for connecting clients with lawyers for legal consultations, case management, and real-time communication.

## 🚀 Live Demo
- **Website:** https://anshpatel8780-arch.github.io/lawyer
- **Repository:** https://github.com/anshpatel8780-arch/lawyer

## Technology Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Three.js** & React Three Fiber for 3D graphics
- **Socket.io** for real-time communication
- **Axios** for HTTP requests
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.io** for WebSocket communication
- **JWT** for authentication
- **Stripe** for payment processing
- **Nodemailer** for email notifications
- **Rate Limiting** and security middleware

## Project Structure

```
lawyer/
├── frontend/          # React + Vite frontend application
│   └── src/
│       ├── components/    # Reusable React components
│       ├── pages/         # Page components
│       ├── context/       # Context API for state management
│       ├── api/           # API call configurations
│       └── socket/        # Socket.io setup
├── backend/           # Node.js + Express API server
│   ├── config/        # Database configuration
│   ├── controllers/    # Request handlers
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   ├── socket/        # Socket.io handlers
│   └── utils/         # Utility functions
├── Procfile           # Heroku deployment configuration
└── .github/workflows/ # GitHub Actions CI/CD
```

## ✨ Features

- ✅ **User Authentication** - JWT-based secure authentication
- ✅ **Real-time Communication** - Socket.io for instant messaging
- ✅ **Case Management** - Create, view, and manage legal cases
- ✅ **Lawyer Profiles** - Browse and select lawyers
- ✅ **Payment Processing** - Stripe integration for payments
- ✅ **Email Notifications** - Automated email alerts
- ✅ **Rate Limiting** - API rate limiting for security
- ✅ **Admin Panel** - Administrative dashboard
- ✅ **Premium Upgrade** - Subscription management
- ✅ **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- ✅ **3D Experience** - Three.js 3D graphics on homepage

## 🔒 Security Features

- Helmet.js for HTTP headers security
- CORS configuration for cross-origin requests
- JWT token-based authentication
- Rate limiting on API endpoints
- Password hashing with bcryptjs
- Environment variable protection

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Cases
- `GET /api/cases` - Get all cases
- `POST /api/cases` - Create new case
- `GET /api/cases/:id` - Get case details
- `PUT /api/cases/:id` - Update case
- `DELETE /api/cases/:id` - Delete case

### Chat
- `GET /api/chat/:caseId` - Get chat messages
- `POST /api/chat/:caseId` - Send message

### Lawyers
- `GET /api/lawyers` - Get all lawyers
- `GET /api/lawyers/:id` - Get lawyer profile
- `PUT /api/lawyers/:id` - Update lawyer profile

### Payments
- `POST /api/stripe/create-payment-intent` - Create payment
- `POST /api/stripe/webhook` - Stripe webhook

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB account
- Stripe account
- GitHub account

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## 📦 Deployment

### GitHub Pages (Frontend)
- Automatically deployed on push to main branch
- Live at: https://anshpatel8780-arch.github.io/lawyer

### Heroku (Backend)
```bash
heroku login
heroku create lawyer-backend
heroku config:set MONGODB_URI=your_connection_string
git push heroku main
```

## 📚 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://anshpatel8780-arch.github.io/lawyer
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://lawyer-backend.herokuapp.com
```

## 👨‍💻 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 📧 Support

For support: support@lawconnect.com

---

**Last Updated:** March 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
