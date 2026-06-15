const Property = require('./model');
const User = require('../auth/model');

const buildFilters = (query) => {
  const filters = {};
  if (query.location) filters.location = { $regex: query.location, $options: 'i' };
  if (query.propertyType) filters.propertyType = query.propertyType;
  if (query.bedrooms) filters.bedrooms = { $gte: Number(query.bedrooms) };
  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
  }
  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { location: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filters;
};

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find(buildFilters(req.query)).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).limit(6);
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    next(error);
  }
};

exports.createProperty = async (req, res, next) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const property = await Property.create({ ...req.body, image, owner: req.user._id });
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) payload.image = `/uploads/${req.file.filename}`;
    const property = await Property.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    next(error);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.toggleSavedProperty = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.id;
    const exists = user.savedProperties.some((id) => id.toString() === propertyId);
    user.savedProperties = exists
      ? user.savedProperties.filter((id) => id.toString() !== propertyId)
      : [...user.savedProperties, propertyId];
    await user.save();
    res.json(user.savedProperties);
  } catch (error) {
    next(error);
  }
};
