const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// Get cases by client ID
router.get('/client/:clientId', async (req, res) => {
    try {
        const cases = await Case.find({ clientId: req.params.clientId }).populate('lawyerId', 'name profilePicture').sort({ createdAt: -1 });
        res.json(cases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get cases by lawyer ID
router.get('/lawyer/:lawyerId', async (req, res) => {
    try {
        const cases = await Case.find({ lawyerId: req.params.lawyerId }).populate('clientId', 'name profilePicture').sort({ createdAt: -1 });
        res.json(cases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create new case
router.post('/', async (req, res) => {
    try {
        const newCase = new Case(req.body);
        const caseSaved = await newCase.save();
        res.json(caseSaved);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update case status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedCase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
