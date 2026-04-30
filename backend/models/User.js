const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'lawyer', 'admin'], default: 'client' },
    isPremium: { type: Boolean, default: false },
    freeMessages: { type: Number, default: 3 },
    profilePicture: { type: String, default: '' },
    otp: { type: String },
    otpExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
