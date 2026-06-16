const Lead = require('./model');

const buildLeadQuery = (query) => {
  const filters = {};

  if (query.status) {
    filters.status = query.status;
  }

  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filters.$or = [
      { fullName: search },
      { email: search },
      { phoneNumber: search },
      { message: search },
    ];
  }

  return filters;
};

exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find(buildLeadQuery(req.query)).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

exports.getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('followUps.createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.addFollowUp = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.followUps.push({
      note: req.body.note,
      nextFollowUpDate: req.body.nextFollowUpDate,
      createdBy: req.user?._id,
    });

    if (req.body.status) {
      lead.status = req.body.status;
    }

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};
