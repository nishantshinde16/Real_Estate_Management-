const CustomerInquiry = require('./model');

exports.createCustomerInquiry = async (req, res, next) => {
  try {
    const inquiry = await CustomerInquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

exports.getCustomerInquiries = async (req, res, next) => {
  try {
    const inquiries = await CustomerInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};
