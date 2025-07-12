import User from '../models/User.js';

// @desc Get current user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update current user's profile
export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, avatar } = req.body;

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get public profile by ID (for seller info on item page)
export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name avatar createdAt');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
