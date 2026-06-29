const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Event description is required']
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Event location or virtual link is required']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    time: {
        type: String,
        required: [true, 'Event start time is required']
    },
    price: {
        type: Number,
        required: [true, 'Ticket price is required'],
        min: [0, 'Price cannot be a negative value'],
        default: 0 // 0 signifies a free event
    },
    totalTickets: {
        type: Number,
        required: [true, 'Total ticket capacity is required'],
        min: [1, 'Event must have at least 1 ticket available']
    },
    availableTickets: {
        type: Number,
        min: [0, 'Available tickets cannot drop below zero']
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' // Professional placeholder fallback
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Establishes relationship linking to our User collection
        required: true
    }
}, {
    timestamps: true
});

// Pre-save validation: Automatically sync availableTickets to totalTickets on initial creation
eventSchema.pre('save', function () {
    if (this.isNew) {
        this.availableTickets = this.totalTickets;
    }
});

module.exports = mongoose.model('Event', eventSchema);