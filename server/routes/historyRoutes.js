import express from 'express';
import {
  getHistoryTimeline,
  getHistoryTimelineAdmin,
  createHistoryItem,
  updateHistoryItem,
  deleteHistoryItem,
} from '../controllers/historyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getHistoryTimeline)
  .post(protect, createHistoryItem);

router.get('/admin', protect, getHistoryTimelineAdmin);

router.route('/:id')
  .put(protect, updateHistoryItem)
  .delete(protect, deleteHistoryItem);

export default router;
