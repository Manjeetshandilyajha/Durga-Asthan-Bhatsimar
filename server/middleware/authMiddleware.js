import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'durga_sthan_bhatsimar_secret_key_2026');
      req.admin = await Admin.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res.status(401).json({ message: 'अधिकृत नहि छी, अमान्य टोकन' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'अधिकृत नहि छी, टोकन उपलब्ध नहि अछि' });
  }
};
