const express = require('express');
const router = express.Router();
const {
    bookTicket,
    getMyBookings,
    getBookingById,
    cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// All booking interactions are private/protected and require a valid Bearer token
router.use(protect);

// POST /api/bookings -> Book a new ticket
// GET /api/bookings/my-bookings -> Retrieve current user's history
router.route('/')
    .post(bookTicket);

router.route('/my-bookings')
    .get(getMyBookings);

// GET /api/bookings/:id -> Inspect a distinct booking record
// PUT /api/bookings/:id/cancel -> Cancel ticket reservation and restore capacity inventory
router.route('/:id')
    .get(getBookingById);

router.route('/:id/cancel')
    .put(cancelBooking);

module.exports = router;