# LawConnect - Full Stack Lawyer Consultation Platform

[![Live Site](https://img.shields.io/badge/Live-Site-blue?style=for-the-badge)](https://anshpatel8780-arch.github.io/lawyer)


A modern full-stack web application for connecting clients with lawyers for legal consultations, case management, and real-time communication.

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

## Prerequisites

- **Node.js** v18+ 
- **npm** or yarn
- **MongoDB** account (MongoDB Atlas)
- **Stripe** account for payment processing
- **GitHub** account for deployment

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Installation & Setup

### Backend Setup
```bash
cd backend
npm install
npm run dev  # Development server with nodemon
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Development server on http://localhost:5173
```

## Deployment

### GitHub Pages (Frontend)

The frontend is automatically deployed to GitHub Pages via GitHub Actions workflow on every push to `main` or `master` branch.

**Steps:**
1. Push changes to the repository
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Access your site at: `https://anshpatel8780-arch.github.io/lawyer`

### Heroku (Backend)

To deploy the backend to Heroku:

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create Heroku app
heroku create lawyer-backend

# Add environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set STRIPE_SECRET_KEY=your_stripe_key
heroku config:set CLIENT_URL=https://anshpatel8780-arch.github.io/lawyer
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Your backend will be live at:** `https://lawyer-backend.herokuapp.com`

## API Endpoints

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

## Features

✅ **User Authentication** - JWT-based secure authentication
✅ **Real-time Communication** - Socket.io for instant messaging
✅ **Case Management** - Create, view, and manage legal cases
✅ **Lawyer Profiles** - Browse and select lawyers
✅ **Payment Processing** - Stripe integration for payments
✅ **Email Notifications** - Automated email alerts
✅ **Rate Limiting** - API rate limiting for security
✅ **Admin Panel** - Administrative dashboard
✅ **Premium Upgrade** - Subscription management
✅ **3D Experience** - Three.js 3D graphics on homepage

## Security Features

- Helmet.js for HTTP headers security
- CORS configuration for cross-origin requests
- JWT token-based authentication
- Rate limiting on API endpoints
- Password hashing with bcryptjs
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email: support@lawconnect.com

---

**Last Updated:** March 2026
**Repository:** https://github.com/anshpatel8780-arch/lawyer
