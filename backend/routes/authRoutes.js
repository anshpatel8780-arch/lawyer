const express = require('express');
const router = express.Router();
const { register, login, getMe, verifyOTP, resendOTP } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify-otp', authLimiter, verifyOTP);
router.post('/resend-otp', authLimiter, resendOTP);
router.get('/me', protect, getMe);

module.exports = router;
