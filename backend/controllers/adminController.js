const User = require('../models/User');
const Lawyer = require('../models/Lawyer');
const Case = require('../models/Case');

// @route GET /api/admin/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route GET /api/admin/lawyers
const getAllLawyers = async (req, res) => {
    try {
        const lawyers = await Lawyer.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(lawyers);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route PUT /api/admin/lawyer/:id/approve
const approveLawyer = async (req, res) => {
    try {
        const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, { verificationStatus: 'approved' }, { new: true });
        if (!lawyer) return res.status(404).json({ msg: 'Lawyer not found' });
        res.json({ msg: 'Lawyer approved', lawyer });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route PUT /api/admin/lawyer/:id/reject
const rejectLawyer = async (req, res) => {
    try {
        const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, { verificationStatus: 'rejected' }, { new: true });
        if (!lawyer) return res.status(404).json({ msg: 'Lawyer not found' });
        res.json({ msg: 'Lawyer rejected', lawyer });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route GET /api/admin/stats
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'client' });
        const totalLawyers = await Lawyer.countDocuments();
        const pendingVerifications = await Lawyer.countDocuments({ verificationStatus: 'pending' });
        const totalCases = await Case.countDocuments();
        const premiumUsers = await User.countDocuments({ isPremium: true });
        res.json({ totalUsers, totalLawyers, pendingVerifications, totalCases, premiumUsers });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = { getAllUsers, getAllLawyers, approveLawyer, rejectLawyer, getStats };
