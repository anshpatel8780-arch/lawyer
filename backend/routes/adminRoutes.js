const express = require('express');
const router = express.Router();
const { getAllUsers, getAllLawyers, approveLawyer, rejectLawyer, getStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/lawyers', getAllLawyers);
router.get('/stats', getStats);
router.put('/lawyer/:id/approve', approveLawyer);
router.put('/lawyer/:id/reject', rejectLawyer);

module.exports = router;
