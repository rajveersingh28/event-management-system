const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Booking must reference an event']
    },
    quantity: {
        type: Number,
        required: [true, 'Ticket quantity is required'],
        min: [1, 'You must book at least 1 ticket'],
        default: 1
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative']
    },
    bookingStatus: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    qrCode: {
        type: String,
        default: '' // Will be populated dynamically using the QR Code Generator utility later
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt flags
});

// Optimization Indexing: Accelerates complex lookups when users fetch their individual booking history
bookingSchema.index({ user: 1, event: 1 });

module.exports = mongoose.model('Booking', bookingSchema);