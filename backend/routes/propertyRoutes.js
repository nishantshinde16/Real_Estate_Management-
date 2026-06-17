const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Uncomment if you have auth

router.route('/')
  .get(propertyController.getProperties)
  .post(/* protect, admin, */ propertyController.createProperty);

router.route('/:id')
  .get(propertyController.getPropertyById)
  .put(/* protect, admin, */ propertyController.updateProperty)
  .delete(/* protect, admin, */ propertyController.deleteProperty);

module.exports = router;