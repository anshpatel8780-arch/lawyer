const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook, confirmPayment } = require('../controllers/stripeController');
const { protect } = require('../middleware/authMiddleware');

// Webhook must use raw body - handled in server.js
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/confirm', protect, confirmPayment);

module.exports = router;
