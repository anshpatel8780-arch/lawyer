const express = require('express');
const router = express.Router();
const { startConversation, getMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startConversation);
router.get('/:conversationId', protect, getMessages);
router.post('/:conversationId/send', protect, sendMessage);

module.exports = router;
