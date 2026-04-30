const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
};

const sendWelcomeEmail = require('../utils/sendEmail');
const sendOTPEmail = require('../utils/brevoEmail');

// @route POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ msg: 'Please fill all fields' });

        if (!email.toLowerCase().endsWith('@gmail.com')) {
            return res.status(400).json({ msg: 'Only official @gmail.com accounts are permitted to register.' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPassword, role: role || 'client' });
        const token = generateToken(user._id, user.role);

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendWelcomeEmail({
                email: user.email,
                subject: 'Welcome to LawConnect Premium Legal Services',
                html: `<h1>Welcome ${user.name}!</h1><p>You have successfully registered on LawConnect. You have 3 free consultation messages available.</p><p>Explore our directory to find highly-rated lawyers.</p>`
            });
        }

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, isPremium: user.isPremium, freeMessages: user.freeMessages }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendOTPEmail(user.email, otp);

        res.json({
            msg: 'OTP sent to your email. Please verify to complete login.',
            email: user.email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route POST /api/auth/verify-otp
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id, user.role);
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, isPremium: user.isPremium, freeMessages: user.freeMessages }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error during OTP verification' });
    }
};

// @route POST /api/auth/resend-otp
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendOTPEmail(user.email, otp);

        res.json({ msg: 'OTP resent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route GET /api/auth/me
const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role, isPremium: user.isPremium, freeMessages: user.freeMessages });
};

module.exports = { register, login, getMe, verifyOTP, resendOTP };
