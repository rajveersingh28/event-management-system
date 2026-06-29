const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Any authenticated user)
const createEvent = async (req, res, next) => {
    try {
        const { title, description, category, location, date, time, price, totalTickets, image } = req.body;

        // The organizer ID is derived straight from the verified user token context
        const event = await Event.create({
            title,
            description,
            category,
            location,
            date,
            time,
            price,
            totalTickets,
            image,
            organizer: req.user._id 
        });

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res, next) => {
    try {
        // Populate pulls associated organizer name and email fields from the User collection
        const events = await Event.find().populate('organizer', 'name email');
        
        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name email');

        if (!event) {
            res.status(404);
            throw new Error('Event not found');
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer or Admin only)
const updateEvent = async (req, res, next) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404);
            throw new Error('Event not found');
        }

        // Authorize: Check if standard user is the real organizer, allow if admin bypass
        if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized to update this event listing');
        }

        // Adjust totalTickets calculation to correctly align availability changes
        if (req.body.totalTickets !== undefined) {
            const ticketDifference = req.body.totalTickets - event.totalTickets;
            req.body.availableTickets = event.availableTickets + ticketDifference;
        }

        // Update properties and return updated document safely
        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer or Admin only)
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404);
            throw new Error('Event not found');
        }

        // Authorize: Check ownership context
        if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized to delete this event listing');
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event removed successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};