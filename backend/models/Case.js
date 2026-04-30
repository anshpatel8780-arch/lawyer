const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    caseType: { type: String, required: true },
    courtLevel: { type: String },
    status: {
        type: String,
        enum: ['Created', 'Consultation', 'Filed', 'Hearing', 'Closed'],
        default: 'Created'
    },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
