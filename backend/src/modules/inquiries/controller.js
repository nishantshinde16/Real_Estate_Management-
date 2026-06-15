const Inquiry = require('./model');

exports.createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create({
      ...req.body,
      userId: req.user?._id || req.body.userId,
    });
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

exports.myInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user._id }).populate('propertyId', 'title location price').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

exports.allInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().populate('userId', 'name email').populate('propertyId', 'title location').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};
