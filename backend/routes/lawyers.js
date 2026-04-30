const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');
const User = require('../models/User');

// Get all verified lawyers
router.get('/', async (req, res) => {
    try {
        const lawyers = await Lawyer.find({ verificationStatus: 'approved' }).populate('userId', 'name email profilePicture');
        res.json(lawyers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Admin specific: get pending lawyers
router.get('/pending', async (req, res) => {
    // In a real app, verify admin JWT here
    try {
        const lawyers = await Lawyer.find({ verificationStatus: 'pending' }).populate('userId', 'name email');
        res.json(lawyers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get lawyer profile by userId
router.get('/:id', async (req, res) => {
    try {
        const lawyer = await Lawyer.findOne({ userId: req.params.id }).populate('userId', 'name email profilePicture');
        if (!lawyer) return res.status(404).json({ msg: 'Lawyer not found' });
        res.json(lawyer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update verification status (Admin)
router.put('/:id/verify', async (req, res) => {
    try {
        const { status } = req.body;
        const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, { verificationStatus: status }, { new: true });
        res.json(lawyer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
