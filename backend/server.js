const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorMiddleware');
const initSocket = require('./socket/socket');

// Routes
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const lawyerRoutes = require('./routes/lawyers');

// Connect DB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', methods: ['GET', 'POST'] }
});

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Stripe webhook needs raw body — mount BEFORE json parser
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/lawyers', lawyerRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', env: process.env.NODE_ENV }));

// Global Error Handler
app.use(errorHandler);

// Init Socket.io
initSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
