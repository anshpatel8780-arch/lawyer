const express = require('express');
const router = express.Router();
const { getClientCases, getLawyerCases, createCase, updateCaseStatus } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/client', protect, authorize('client'), getClientCases);
router.get('/lawyer', protect, authorize('lawyer'), getLawyerCases);
router.post('/create', protect, authorize('client'), createCase);
router.put('/:id/status', protect, authorize('lawyer', 'admin'), updateCaseStatus);

module.exports = router;
