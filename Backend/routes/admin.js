import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import {
  getAllUsers,
  deleteUser,
  getAllItems,
  updateItemStatus,
  deleteItem,
  getAllSwaps
} from '../controllers/adminController.js';

const router = express.Router();

// All routes protected + admin only
router.use(protect);
router.use(isAdmin);

// User routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Item routes
router.get('/items', getAllItems);
router.patch('/items/:id/status', updateItemStatus);
router.delete('/items/:id', deleteItem);

// Swap routes
router.get('/swaps', getAllSwaps);

export default router;
