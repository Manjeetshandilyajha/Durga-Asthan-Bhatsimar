import express from 'express';
import {
  sendContactMessage,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(sendContactMessage)
  .get(protect, getContactMessages);

router.put('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteContactMessage);

export default router;
