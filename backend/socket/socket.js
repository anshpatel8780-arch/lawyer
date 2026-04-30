const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const initSocket = (io) => {
    // Track online users
    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        // User comes online
        socket.on('user_online', (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit('online_users', Array.from(onlineUsers.keys()));
        });

        // Join a conversation room
        socket.on('join_chat', (conversationId) => {
            socket.join(conversationId);
        });

        // Typing indicator
        socket.on('typing', ({ conversationId, userId }) => {
            socket.to(conversationId).emit('typing', { userId });
        });

        socket.on('stop_typing', ({ conversationId }) => {
            socket.to(conversationId).emit('stop_typing');
        });

        // Send message with premium logic
        socket.on('send_message', async (data) => {
            try {
                const { conversationId, senderId, text } = data;
                const sender = await User.findById(senderId);

                if (!sender) return socket.emit('error', { message: 'User not found' });

                // Premium check for clients
                if (sender.role === 'client' && !sender.isPremium) {
                    if (sender.freeMessages <= 0) {
                        socket.emit('free_limit_reached');
                        return;
                    }
                    sender.freeMessages -= 1;
                    await sender.save();
                }

                const newMessage = await Message.create({ conversationId, senderId, text });
                await Conversation.findByIdAndUpdate(conversationId, {
                    lastMessage: text,
                    lastMessageAt: Date.now()
                });

                // Broadcast to room
                io.to(conversationId).emit('receive_message', newMessage);

                // Update free message count for the sender
                if (sender.role === 'client' && !sender.isPremium) {
                    socket.emit('update_free_messages', { freeMessages: sender.freeMessages });
                }
            } catch (error) {
                console.error('Socket error:', error);
                socket.emit('error', { message: 'Message sending failed' });
            }
        });

        socket.on('disconnect', () => {
            onlineUsers.forEach((socketId, userId) => {
                if (socketId === socket.id) onlineUsers.delete(userId);
            });
            io.emit('online_users', Array.from(onlineUsers.keys()));
            console.log('Socket disconnected:', socket.id);
        });
    });
};

module.exports = initSocket;
