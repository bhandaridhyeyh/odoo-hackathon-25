import User from '../models/User.js';
import Item from '../models/Item.js';
import Swap from '../models/Swap.js';

// ==============================
// USERS MANAGEMENT
// ==============================

// @desc Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// ITEMS MANAGEMENT
// ==============================

// @desc Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('userId', 'name email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Approve/Reject/Delete Item
export const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g., "available", "rejected", "swapped"
    const item = await Item.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// SWAPS MANAGEMENT
// ==============================

// @desc Get all swaps
export const getAllSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate('itemId')
      .populate('requesterId', 'name')
      .populate('uploaderId', 'name');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
