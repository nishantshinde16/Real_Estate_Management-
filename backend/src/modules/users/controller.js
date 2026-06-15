const User = require('../auth/model');
const Property = require('../properties/model');
const Inquiry = require('../inquiries/model');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('savedProperties');
    const inquiries = await Inquiry.find({ userId: req.user._id }).populate('propertyId', 'title location').sort({ createdAt: -1 });
    res.json({ user, inquiries });
  } catch (error) {
    next(error);
  }
};

exports.getAdminStats = async (req, res, next) => {
  try {
    const [users, properties, inquiries] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Inquiry.countDocuments(),
    ]);
    res.json({ users, properties, inquiries });
  } catch (error) {
    next(error);
  }
};
