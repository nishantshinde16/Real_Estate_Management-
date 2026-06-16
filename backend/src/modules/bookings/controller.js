const Booking = require('./model');

const bookingPopulate = [
  { path: 'propertyId', select: 'title location price propertyType image' },
  { path: 'userId', select: 'name email' },
];

const buildBookingQuery = (query) => {
  const filters = {};

  if (query.status) {
    filters.status = query.status;
  }

  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filters.$or = [
      { customerName: search },
      { email: search },
      { mobile: search },
      { address: search },
    ];
  }

  return filters;
};

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user?._id || req.body.userId,
      status: 'Pending',
    });

    const populatedBooking = await Booking.findById(booking._id).populate(bookingPopulate);
    res.status(201).json(populatedBooking);
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find(buildBookingQuery(req.query))
      .populate(bookingPopulate)
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(bookingPopulate);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user?.role !== 'admin' && booking.userId?._id.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate(bookingPopulate);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate(bookingPopulate)
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};
