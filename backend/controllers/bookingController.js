const generateQRCode = require('../utils/generateQRCode');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// @desc    Book ticket(s) for an event
// @route   POST /api/bookings
// @access  Private

const bookTicket = async (req, res, next) => {
    try {
        const { eventId, quantity } = req.body;

        // 1. Validate inputs
        if (!eventId || !quantity || quantity < 1) {
            res.status(400);
            throw new Error('Please provide a valid event ID and a quantity of at least 1');
        }

        // 2. Fetch target event
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404);
            throw new Error('The requested event does not exist');
        }

        // 3. Inventory Check
        if (event.availableTickets < quantity) {
            res.status(400);
            throw new Error(`Insufficient tickets available. Only ${event.availableTickets} tickets remaining.`);
        }

        // 4. Calculate pricing
        const totalAmount = quantity * event.price;

        // 5. Update Inventory (Atomic check-and-modify sequence)
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, availableTickets: { $gte: quantity } },
            { $inc: { availableTickets: -quantity } },
            { new: true }
        );

        if (!updatedEvent) {
            res.status(400);
            throw new Error('Ticket booking failed due to a high-traffic inventory conflict. Please try again.');
        }

        // 6. Create Initial Booking Document record
        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            quantity,
            totalAmount,
            bookingStatus: 'Booked',
            paymentStatus: event.price === 0 ? 'Paid' : 'Pending',
            qrCode: '' // Leave empty initially
        });

        // 7. Dynamic Automation Step: Generate the structured QR code string payload
        const qrCodeData = await generateQRCode(booking._id, req.user._id, eventId);

        // 8. Bind QR payload back to our document and commit the transaction save
        booking.qrCode = qrCodeData;
        await booking.save();

        // 9. Return the fully initialized booking payload response
        res.status(201).json({
            success: true,
            message: 'Booking initiated and ticket QR Code generated successfully',
            booking
        });
    } catch (error) {
        next(error);
    }
};
// @desc    Get all bookings belonging to the authenticated user
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('event', 'title description location date time price image')
            .sort({ createdAt: -1 }); // Order newest bookings first

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get individual booking details by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email')
            .populate('event', 'title description location date time price organizer');

        if (!booking) {
            res.status(404);
            throw new Error('Booking record not found');
        }

        // Authorization boundary: Access strictly allowed only to the booking owner OR an admin
        if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Access denied. You are not authorized to view this booking.');
        }

        res.status(200).json({
            success: true,
            booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel an existing booking and return inventory
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            res.status(404);
            throw new Error('Booking record not found');
        }

        // Authorization boundary: Only the asset owner can trigger cancellation
        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Access denied. You lack authorization to cancel this booking.');
        }

        // Prevent redundant status revisions (double cancellation check)
        if (booking.bookingStatus === 'Cancelled') {
            res.status(400);
            throw new Error('This booking has already been cancelled.');
        }

        // 1. Mutate Booking lifecycle status properties
        booking.bookingStatus = 'Cancelled';
        await booking.save();

        // 2. Re-allocate inventory seats back to parent Event capacity metrics
        await Event.findByIdAndUpdate(booking.event, {
            $inc: { availableTickets: booking.quantity }
        });

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully. Tickets returned to inventory.',
            booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Check in booking
// @route   PUT /api/bookings/checkin/:id
// @access  Private
const checkInBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('event');

        if (!booking) {
            res.status(404);
            throw new Error('Booking not found');
        }

        if (booking.bookingStatus === 'Cancelled') {
            res.status(400);
            throw new Error('This booking has been cancelled.');
        }

        if (booking.checkInStatus === 'Checked In') {
            res.status(400);
            throw new Error('Ticket already checked in.');
        }

        booking.checkInStatus = 'Checked In';

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Ticket checked in successfully.',
            booking
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    bookTicket,
    getMyBookings,
    getBookingById,
    cancelBooking,
    checkInBooking
};