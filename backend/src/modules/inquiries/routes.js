const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { allInquiries, createInquiry, myInquiries } = require('./controller');

const router = express.Router();

router.post('/', createInquiry);
router.get('/mine', protect, myInquiries);
router.get('/', protect, adminOnly, allInquiries);

module.exports = router;
