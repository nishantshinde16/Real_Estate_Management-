const Installment = require('./model');

exports.createInstallment = async (req, res, next) => {
  try {
    const installment = await Installment.create(req.body);
    res.status(201).json(installment);
  } catch (error) {
    next(error);
  }
};

exports.getInstallments = async (req, res, next) => {
  try {
    const installments = await Installment.find().sort({ dueDate: 1 });
    res.json(installments);
  } catch (error) {
    next(error);
  }
};

exports.updateInstallment = async (req, res, next) => {
  try {
    const installment = await Installment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!installment) return res.status(404).json({ message: 'Installment not found' });
    res.json(installment);
  } catch (error) {
    next(error);
  }
};

exports.deleteInstallment = async (req, res, next) => {
  try {
    const installment = await Installment.findByIdAndDelete(req.params.id);
    if (!installment) return res.status(404).json({ message: 'Installment not found' });
    res.json({ message: 'Installment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
