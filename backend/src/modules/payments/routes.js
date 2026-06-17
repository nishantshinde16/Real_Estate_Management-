const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createPayment, deletePayment, getPayments, updatePayment } = require('./controller');

const router = express.Router();

router.use(protect, adminOnly);
router.route('/').get(getPayments).post(createPayment);
router.route('/:id').put(updatePayment).delete(deletePayment);

module.exports = router;
