const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createCustomerInquiry, getCustomerInquiries } = require('./controller');

const router = express.Router();

router.post('/', createCustomerInquiry);
router.get('/', protect, adminOnly, getCustomerInquiries);

module.exports = router;
