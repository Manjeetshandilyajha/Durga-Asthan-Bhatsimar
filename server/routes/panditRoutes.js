import express from 'express';
import {
  getPandits,
  getPanditById,
  getPanditsAdmin,
  createPandit,
  updatePandit,
  deletePandit,
} from '../controllers/panditController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getPandits)
  .post(protect, upload.single('photo'), createPandit);

router.get('/admin/all', protect, getPanditsAdmin);

router
  .route('/:id')
  .get(getPanditById)
  .put(protect, upload.single('photo'), updatePandit)
  .delete(protect, deletePandit);

export default router;
