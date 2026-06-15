const express = require('express');
const { login, profile, register } = require('./controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);

module.exports = router;
