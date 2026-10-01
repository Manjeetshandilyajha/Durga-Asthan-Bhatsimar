import express from 'express';
import {
  getEvents,
  getEventsAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, upload.single('image'), createEvent);

router.get('/admin', protect, getEventsAdmin);

router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

export default router;
