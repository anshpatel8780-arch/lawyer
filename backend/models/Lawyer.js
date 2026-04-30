const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: [{ type: String }],
    experienceYears: { type: Number, default: 0 },
    barLicenseNumber: { type: String, required: true },
    degreeDocument: { type: String },
    licenseDocument: { type: String },
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rating: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
