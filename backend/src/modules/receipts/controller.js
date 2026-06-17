const Receipt = require('./model');
const { buildPdf } = require('../../services/pdfService');

exports.createReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.create(req.body);
    res.status(201).json(receipt);
  } catch (error) {
    next(error);
  }
};

exports.getReceipts = async (req, res, next) => {
  try {
    const receipts = await Receipt.find().sort({ receivedDate: -1 });
    res.json(receipts);
  } catch (error) {
    next(error);
  }
};

exports.deleteReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
    res.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.downloadReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
    const pdf = buildPdf(`Receipt ${receipt.receiptNumber}`, [
      ['Customer', receipt.customerName],
      ['Property', receipt.property],
      ['Amount Received', receipt.amount],
      ['Payment Mode', receipt.paymentMode],
      ['Transaction ID', receipt.transactionId],
      ['Received Date', receipt.receivedDate.toDateString()],
      ['Notes', receipt.notes],
    ]);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${receipt.receiptNumber}.pdf"`);
    res.send(pdf);
  } catch (error) {
    next(error);
  }
};
