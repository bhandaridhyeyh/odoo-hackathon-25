import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createSwap,
  getUserSwaps,
  updateSwapStatus
} from '../controllers/swapController.js';

const router = express.Router();

router.post('/', protect, createSwap);
router.get('/', protect, getUserSwaps);
router.patch('/:id/status', protect, updateSwapStatus);

export default router;
