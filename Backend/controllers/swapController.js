import Swap from '../models/Swap.js';
import Item from '../models/Item.js';
import User from '../models/User.js';

// @desc Initiate a swap
export const createSwap = async (req, res) => {
  try {
    const { itemId, type } = req.body;

    const item = await Item.findById(itemId);
    if (!item || item.status !== 'available')
      return res.status(400).json({ message: 'Item unavailable' });

    // For points-based swaps, check balance
    if (type === 'points') {
      const requester = await User.findById(req.user._id);
      if (requester.points < 10) // assume fixed cost
        return res.status(403).json({ message: 'Insufficient points' });

      requester.points -= 10;
      await requester.save();
    }

    const swap = await Swap.create({
      itemId,
      requesterId: req.user._id,
      uploaderId: item.userId,
      type,
    });

    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all swaps of logged-in user
export const getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requesterId: req.user._id }, { uploaderId: req.user._id }]
    }).populate('itemId').populate('requesterId', 'name avatar');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update swap status (accept/reject)
export const updateSwapStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const swap = await Swap.findById(id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    if (String(swap.uploaderId) !== String(req.user._id))
      return res.status(403).json({ message: 'Only uploader can modify this swap' });

    swap.status = status;
    await swap.save();

    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swap.itemId, { status: 'swapped' });

      // Optionally reward uploader with points
      await User.findByIdAndUpdate(swap.uploaderId, { $inc: { points: 10 } });
    }

    res.json(swap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
