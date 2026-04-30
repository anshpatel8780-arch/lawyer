const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock'); // Default for dev
const User = require('../models/User');

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { userId, planType } = req.body; // 'monthly' or 'yearly'

        let unit_amount = planType === 'yearly' ? 34800 : 2900; // $348 or $29

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `LawConnect Premium - ${planType} plan`,
                        },
                        unit_amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // using payment for simplicity instead of subscription
            success_url: `http://localhost:5173/premium?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/premium?canceled=true`,
            client_reference_id: userId
        });

        res.json({ id: session.id, url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create an endpoint to confirm payment and upgrade user
router.post('/confirm-payment', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isPremium = true;
        await user.save();

        res.json({ msg: 'User upgraded successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
