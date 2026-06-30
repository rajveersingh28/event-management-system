const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private (Admin)

const getDashboardAnalytics = async (req, res, next) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalEvents = await Event.countDocuments();

        const totalBookings = await Booking.countDocuments({
            bookingStatus: 'Booked'
        });

        const revenueResult = await Booking.aggregate([
            {
                $match: {
                    paymentStatus: 'Paid',
                    bookingStatus: 'Booked'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: '$totalAmount'
                    }
                }
            }
        ]);

        const ticketsResult = await Booking.aggregate([
            {
                $match: {
                    bookingStatus: 'Booked'
                }
            },
            {
                $group: {
                    _id: null,
                    totalTickets: {
                        $sum: '$quantity'
                    }
                }
            }
        ]);

        const revenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        const ticketsSold =
            ticketsResult.length > 0
                ? ticketsResult[0].totalTickets
                : 0;

        res.status(200).json({
            success: true,
            analytics: {
                totalUsers,
                totalEvents,
                totalBookings,
                ticketsSold,
                revenue
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardAnalytics
};