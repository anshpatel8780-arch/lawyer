const Case = require('../models/Case');

// @route GET /api/cases/client
const getClientCases = async (req, res) => {
    try {
        const cases = await Case.find({ clientId: req.user._id })
            .populate('lawyerId', 'name profilePicture')
            .sort({ createdAt: -1 });
        res.json(cases);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route GET /api/cases/lawyer
const getLawyerCases = async (req, res) => {
    try {
        const cases = await Case.find({ lawyerId: req.user._id })
            .populate('clientId', 'name profilePicture')
            .sort({ createdAt: -1 });
        res.json(cases);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route POST /api/cases/create
const createCase = async (req, res) => {
    try {
        const { lawyerId, caseType, courtLevel, title, description } = req.body;
        const newCase = await Case.create({
            clientId: req.user._id,
            lawyerId,
            title: title || caseType,
            description,
            caseType,
            courtLevel,
        });
        res.status(201).json(newCase);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route PUT /api/cases/:id/status
const updateCaseStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Case.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ msg: 'Case not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = { getClientCases, getLawyerCases, createCase, updateCaseStatus };
