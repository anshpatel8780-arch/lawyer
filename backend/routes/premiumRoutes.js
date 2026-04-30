const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/premium/simulate-payment
// Securely simulates a successful Stripe checkout purely for testing purposes
router.post('/simulate-payment', protect, async (req, res) => {
    try {
        const { planType } = req.body;

        // Create a fake subscription ID based on the plan
        const subId = `sub_mock_${planType}_${Math.random().toString(36).substring(7)}`;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                isPremium: true,
                subscriptionId: subId
            },
            { new: true }
        ).select('-password');

        res.json({
            msg: 'Premium activated successfully via Simulator!',
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error during payment simulation' });
    }
});

module.exports = router;
