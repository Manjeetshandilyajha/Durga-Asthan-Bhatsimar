import express from 'express';
import {
  getAnnouncements,
  getAnnouncementsAdmin,
  createAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAnnouncements)
  .post(protect, createAnnouncement);

router.get('/admin', protect, getAnnouncementsAdmin);

router.delete('/:id', protect, deleteAnnouncement);

export default router;
