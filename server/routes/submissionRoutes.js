import express from 'express';
import {
  submitHistory,
  getHistorySubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .post(upload.single('image'), submitHistory)
  .get(protect, getHistorySubmissions);

router.put('/:id/approve', protect, updateSubmissionStatus);
router.delete('/:id', protect, deleteSubmission);

export default router;
