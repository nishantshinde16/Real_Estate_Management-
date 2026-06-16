const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const {
  createBooking,
  getBooking,
  getBookings,
  getMyBookings,
  updateBookingStatus,
} = require('./controller');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id/status', protect, adminOnly, updateBookingStatus);

module.exports = router;
