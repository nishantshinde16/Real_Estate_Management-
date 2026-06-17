const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const {
  createRole,
  createUser,
  getAdminStats,
  getDashboard,
  getRoles,
  getUsers,
  updateRolePermissions,
  updateUserRole,
} = require('./controller');

const router = express.Router();

router.get('/dashboard', protect, getDashboard);
router.get('/', protect, adminOnly, getUsers);
router.post('/', protect, adminOnly, createUser);
router.get('/roles', protect, adminOnly, getRoles);
router.post('/roles', protect, adminOnly, createRole);
router.patch('/roles/:id/permissions', protect, adminOnly, updateRolePermissions);
router.get('/admin/stats', protect, adminOnly, getAdminStats);
router.patch('/:id/role', protect, adminOnly, updateUserRole);

module.exports = router;
