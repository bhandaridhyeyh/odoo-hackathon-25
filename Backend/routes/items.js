import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js';
import {
  createItem,
  getAllItems,
  getItemById,
  getUserItems
} from '../controllers/itemController.js';

const router = express.Router();

// Public routes first
router.get('/', getAllItems);
router.get('/user/:userId', getUserItems);
router.get('/:id', getItemById);

// Protected create route with Multer + Cloudinary
router.post('/', protect, upload.array('images', 4), createItem);

export default router;
