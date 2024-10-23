const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    DonatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true
    },
    TransactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['pending', 'done'],
        required: true
    },
    DonationDate: {
        type: String,
        required: true
    },
});

const Donation = mongoose.model('donations', donationSchema);
module.exports = Donation;