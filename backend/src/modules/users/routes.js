const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { getAdminStats, getDashboard, getUsers } = require('./controller');

const router = express.Router();

router.get('/dashboard', protect, getDashboard);
router.get('/', protect, adminOnly, getUsers);
router.get('/admin/stats', protect, adminOnly, getAdminStats);

module.exports = router;
