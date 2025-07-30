import express from 'express';
import Business from '../models/Business.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get business details
router.get('/', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findByPk(req.user.businessId);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.json({ business });
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ error: 'Failed to get business details' });
  }
});

// Update business details (owner only)
router.put('/', authenticateToken, requireRole(['owner']), async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      phone,
      email,
      timezone,
      currency,
      taxRate,
      settings
    } = req.body;

    const business = await Business.findByPk(req.user.businessId);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    await business.update({
      name: name || business.name,
      description: description || business.description,
      address: address || business.address,
      phone: phone || business.phone,
      email: email || business.email,
      timezone: timezone || business.timezone,
      currency: currency || business.currency,
      taxRate: taxRate !== undefined ? taxRate : business.taxRate,
      settings: settings || business.settings
    });

    res.json({
      message: 'Business updated successfully',
      business
    });
  } catch (error) {
    console.error('Update business error:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
});

export default router; 