const crypto = require('crypto');
const razorpayInstance = require('../config/razorpay');
const Booking = require('../models/Booking');

// @desc    Create a new Razorpay Order for a booking
// @route   POST /api/payments/create-order
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            res.status(400);
            throw new Error('Please provide a valid booking ID');
        }

        // 1. Fetch and validate booking record
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            res.status(404);
            throw new Error('Booking record not found');
        }

        // 2. Authorization validation check
        if (booking.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Access Denied. You do not own this booking');
        }

        // 3. Status validation check
        if (booking.bookingStatus === 'Cancelled') {
            res.status(400);
            throw new Error('Cannot pay for a cancelled booking');
        }

        if (booking.paymentStatus === 'Paid') {
            res.status(400);
            throw new Error('This booking has already been paid for');
        }

        // 4. Configure Razorpay Order Parameters
        // Razorpay accepts currency amounts in the SMALLEST unit (e.g., Paise for INR)
        // Hence, we multiply our standard amount by 100 (1 INR = 100 Paise)
        const options = {
            amount: Math.round(booking.totalAmount * 100), 
            currency: 'INR',
            receipt: `receipt_order_${booking._id}`
        };

        // 5. Fire request to Razorpay Gateway API to open the order
        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            key_id: process.env.RAZORPAY_KEY_ID, // Frontend will require this to open checkout modal
            order
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify the cryptographic token returned by Razorpay payment modal
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res, next) => {
    try {
        const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.status(400);
            throw new Error('Missing transaction parameters for verification');
        }

        // 1. Re-calculate signature locally using HMAC SHA256 algorithm
        // Format payload string: "order_id|payment_id"
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // 2. Validate authenticity against the signature returned by the client
        if (generatedSignature === razorpay_signature) {
            
            // 3. Update application status parameters inside our database
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                res.status(404);
                throw new Error('Booking transaction not found');
            }

            // Ensure the logged-in user owns this booking
            if (booking.user.toString() !== req.user._id.toString()) {
                res.status(403);
                throw new Error('Access Denied. You do not own this booking');
            }

            booking.paymentStatus = 'Paid';
            await booking.save();

            res.status(200).json({
                success: true,
                message: 'Payment verified and ticket confirmed successfully',
                bookingStatus: booking.bookingStatus,
                paymentStatus: booking.paymentStatus
            });
        } else {
            res.status(400);
            throw new Error('Payment verification failed. Tampered or invalid signature.');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    verifyPayment
};