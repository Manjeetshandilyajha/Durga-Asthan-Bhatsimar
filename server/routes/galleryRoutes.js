import express from 'express';
import {
  getGallery,
  getGalleryAdmin,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, upload.single('image'), createGalleryItem);

router.get('/admin', protect, getGalleryAdmin);

router.delete('/:id', protect, deleteGalleryItem);

export default router;
