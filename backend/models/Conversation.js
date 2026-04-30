const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: String },
    lastMessageAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
