const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// @route POST /api/chat/start
const startConversation = async (req, res) => {
    try {
        const { lawyerId } = req.body;
        const clientId = req.user._id;

        let conversation = await Conversation.findOne({ clientId, lawyerId });
        if (!conversation) {
            conversation = await Conversation.create({ clientId, lawyerId });
        }
        res.json(conversation);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route GET /api/chat/:conversationId
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId })
            .populate('senderId', 'name profilePicture')
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route POST /api/chat/:conversationId/send (REST fallback)
const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const sender = await User.findById(req.user._id);

        if (sender.role === 'client' && !sender.isPremium) {
            if (sender.freeMessages <= 0) {
                return res.status(403).json({ msg: 'Free consultation limit reached. Please upgrade to Premium.' });
            }
            sender.freeMessages -= 1;
            await sender.save();
        }

        const msg = await Message.create({
            conversationId: req.params.conversationId,
            senderId: req.user._id,
            text
        });
        await Conversation.findByIdAndUpdate(req.params.conversationId, { lastMessage: text, lastMessageAt: Date.now() });

        res.json({ msg, freeMessages: sender.freeMessages });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = { startConversation, getMessages, sendMessage };
