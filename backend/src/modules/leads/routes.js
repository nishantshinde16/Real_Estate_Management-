const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const {
  addFollowUp,
  createLead,
  deleteLead,
  getLead,
  getLeads,
  updateLead,
} = require('./controller');

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, adminOnly, getLeads);
router.get('/:id', protect, adminOnly, getLead);
router.put('/:id', protect, adminOnly, updateLead);
router.delete('/:id', protect, adminOnly, deleteLead);
router.post('/:id/follow-ups', protect, adminOnly, addFollowUp);

module.exports = router;
