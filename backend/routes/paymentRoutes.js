const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Secure payment gateway routing using the standard protect token verification layer
router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;