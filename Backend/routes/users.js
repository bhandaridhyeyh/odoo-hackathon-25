import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getMyProfile,
  updateMyProfile,
  getPublicProfile
} from '../controllers/userController.js';

const router = express.Router();

// Protected Routes
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);

// Public route for viewing profile (on item detail page)
router.get('/:id', getPublicProfile);

export default router;
