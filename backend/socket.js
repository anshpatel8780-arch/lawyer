const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_chat', (conversationId) => {
            socket.join(conversationId);
            console.log(`User joined conversation ${conversationId}`);
        });

        socket.on('send_message', async (data) => {
            try {
                const { conversationId, senderId, text } = data;

                // Premium Check Logic
                const sender = await User.findById(senderId);
                if (sender.role === 'client' && !sender.isPremium) {
                    if (sender.freeMessages <= 0) {
                        socket.emit('error', { message: 'Free consultation limit reached. Please upgrade to Premium.' });
                        return;
                    }
                    sender.freeMessages -= 1;
                    await sender.save();
                }

                const newMessage = new Message({ conversationId, senderId, text });
                await newMessage.save();

                await Conversation.findByIdAndUpdate(conversationId, {
                    lastMessage: text,
                    lastMessageAt: Date.now()
                });

                // Broadcast to room
                io.to(conversationId).emit('receive_message', newMessage);

                if (sender.role === 'client') {
                    socket.emit('update_free_messages', { freeMessages: sender.freeMessages });
                }
            } catch (error) {
                console.error('Socket error:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
