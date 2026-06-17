const jwt = require('jsonwebtoken');
const User = require('./model');
const Role = require('../users/roleModel');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const defaultPermissions = {
  admin: ['Dashboard', 'Properties', 'Bookings', 'Leads', 'Users', 'Finance', 'Feedbacks', 'Roles', 'Permissions'],
  user: ['Browse Properties', 'Create Bookings', 'My Bookings', 'Inquiries'],
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getPermissionsForRole = async (roleName) => {
  const role = await Role.findOne({ name: new RegExp(`^${escapeRegExp(roleName)}$`, 'i') });
  return role?.permissions?.length ? role.permissions : defaultPermissions[roleName] || [];
};

const sendAuthResponse = async (res, user, statusCode = 200) => {
  const permissions = await getPermissionsForRole(user.role);

  res.status(statusCode).json({
    token: signToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions,
      savedProperties: user.savedProperties,
    },
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role: role || 'user' });
    await sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    await sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res) => {
  res.json(req.user);
};
