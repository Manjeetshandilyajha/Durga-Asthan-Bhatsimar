import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'durga_sthan_bhatsimar_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'कृपया यूजरनेम आ पासवर्ड दर्ज करू' });
    }

    let admin = await Admin.findOne({ username });

    // Fallback default admin check if database not initialized
    if (!admin && username === 'admin' && password === 'admin123') {
      const token = generateToken('default_admin_id');
      return res.json({
        _id: 'default_admin_id',
        username: 'admin',
        email: 'admin@durgasthanbhatsimar.org',
        role: 'admin',
        token,
      });
    }

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'गलत यूजरनेम अथवा पासवर्ड' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    if (req.admin) {
      res.json(req.admin);
    } else {
      res.json({ _id: 'default_admin_id', username: 'admin', role: 'admin' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
