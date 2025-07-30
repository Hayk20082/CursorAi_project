import express from 'express';
import User from '../models/User.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users for the business (owner/manager only)
router.get('/', authenticateToken, requireRole(['owner', 'manager']), async (req, res) => {
  try {
    const users = await User.findAll({
      where: { businessId: req.user.businessId },
      attributes: { exclude: ['password'] },
      include: ['business']
    });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { 
        id: req.params.id,
        businessId: req.user.businessId 
      },
      attributes: { exclude: ['password'] },
      include: ['business']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Update user (owner only)
router.put('/:id', authenticateToken, requireRole(['owner']), async (req, res) => {
  try {
    const { firstName, lastName, email, role, isActive } = req.body;
    const user = await User.findOne({
      where: { 
        id: req.params.id,
        businessId: req.user.businessId 
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      role: role || user.role,
      isActive: isActive !== undefined ? isActive : user.isActive
    });

    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (owner only)
router.delete('/:id', authenticateToken, requireRole(['owner']), async (req, res) => {
  try {
    const user = await User.findOne({
      where: { 
        id: req.params.id,
        businessId: req.user.businessId 
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router; 