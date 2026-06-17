const User = require('../auth/model');
const Property = require('../properties/model');
const Inquiry = require('../inquiries/model');
const Role = require('./roleModel');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const defaultPermissions = {
  admin: ['Dashboard', 'Properties', 'Bookings', 'Leads', 'Users', 'Finance', 'Feedbacks', 'Roles', 'Permissions'],
  user: ['Browse Properties', 'Create Bookings', 'My Bookings', 'Inquiries'],
};

const getPermissionsForRole = async (roleName) => {
  const role = await Role.findOne({ name: new RegExp(`^${escapeRegExp(roleName)}$`, 'i') });
  return role?.permissions?.length ? role.permissions : defaultPermissions[roleName] || [];
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role: role || 'user' });
    const safeUser = await User.findById(user._id).select('-password');
    res.status(201).json(safeUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role || 'user' },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const { name, description, permissions = [] } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Role name is required' });

    const exists = await Role.findOne({ name: new RegExp(`^${escapeRegExp(name.trim())}$`, 'i') });
    if (exists) return res.status(400).json({ message: 'Role already exists' });

    const role = await Role.create({ name: name.trim(), description, permissions });
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

exports.updateRolePermissions = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions: req.body.permissions || [] },
      { new: true, runValidators: true }
    );

    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('savedProperties');
    const inquiries = await Inquiry.find({ userId: req.user._id }).populate('propertyId', 'title location').sort({ createdAt: -1 });
    const permissions = await getPermissionsForRole(user.role);
    res.json({ user: { ...user.toObject(), permissions }, inquiries });
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
