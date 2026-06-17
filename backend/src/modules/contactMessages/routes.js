const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createContactMessage, getContactMessages } = require('./controller');

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, adminOnly, getContactMessages);

module.exports = router;
