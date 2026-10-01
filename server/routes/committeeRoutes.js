import express from 'express';
import {
  getCommitteeMembers,
  getCommitteeMemberById,
  getCommitteeMembersAdmin,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
} from '../controllers/committeeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getCommitteeMembers)
  .post(protect, upload.single('photo'), createCommitteeMember);

router.get('/admin/all', protect, getCommitteeMembersAdmin);

router
  .route('/:id')
  .get(getCommitteeMemberById)
  .put(protect, upload.single('photo'), updateCommitteeMember)
  .delete(protect, deleteCommitteeMember);

export default router;
