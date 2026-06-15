const express = require('express');
const upload = require('../../middleware/upload');
const { adminOnly, protect } = require('../../middleware/auth');
const {
  createProperty,
  deleteProperty,
  getFeaturedProperties,
  getProperties,
  getProperty,
  toggleSavedProperty,
  updateProperty,
} = require('./controller');

const router = express.Router();

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getProperty);
router.post('/', protect, adminOnly, upload.single('image'), createProperty);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProperty);
router.delete('/:id', protect, adminOnly, deleteProperty);
router.post('/:id/save', protect, toggleSavedProperty);

module.exports = router;
