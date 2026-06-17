const express = require('express');
const { adminOnly, protect } = require('../../middleware/auth');
const { createReceipt, deleteReceipt, downloadReceipt, getReceipts } = require('./controller');

const router = express.Router();

router.use(protect, adminOnly);
router.route('/').get(getReceipts).post(createReceipt);
router.get('/:id/download', downloadReceipt);
router.delete('/:id', deleteReceipt);

module.exports = router;
