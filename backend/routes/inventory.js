import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Placeholder routes for inventory management
router.get('/', authenticateToken, async (req, res) => {
  res.json({ message: 'Inventory routes - to be implemented' });
});

export default router; 