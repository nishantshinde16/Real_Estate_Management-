const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createInstallment, deleteInstallment, getInstallments, updateInstallment } = require('./controller');

const router = express.Router();

router.use(protect, adminOnly);
router.route('/').get(getInstallments).post(createInstallment);
router.route('/:id').put(updateInstallment).delete(deleteInstallment);

module.exports = router;
