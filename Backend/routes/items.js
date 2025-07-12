import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItem,
  getAllItems,
  getItemById,
  getUserItems
} from '../controllers/itemController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public Routes
router.get('/', getAllItems);                    // All items or featured
router.get('/:id', getItemById);                 // Get single item
router.get('/user/:userId', getUserItems);       // Get items by user

// Protected Routes
router.post('/', protect, upload.array('images', 4), createItem); // Add new item

export default router;
