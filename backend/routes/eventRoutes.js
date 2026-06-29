const express = require('express');
const router = express.Router();
const { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent 
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// Public reads, protected writes
router.route('/')
    .get(getAllEvents)
    .post(protect, createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

module.exports = router;