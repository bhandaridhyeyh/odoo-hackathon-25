// /routes/ai.js
import express from 'express';
import { improveDescription } from '../controllers/aiController.js';
const router = express.Router();
router.post('/improve', improveDescription);
export default router;
