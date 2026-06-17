const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createInvoice, deleteInvoice, downloadInvoice, getInvoices, updateInvoice } = require('./controller');

const router = express.Router();

router.use(protect, adminOnly);
router.route('/').get(getInvoices).post(createInvoice);
router.get('/:id/download', downloadInvoice);
router.route('/:id').put(updateInvoice).delete(deleteInvoice);

module.exports = router;
