import Item from '../models/Item.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const createItem = async (req, res) => {
  try {
    console.log("➡️ Received fields:", req.body);
    console.log("🖼️ Files received:", req.files);

    const { title, description, category, size, condition, tags, isFeatured } = req.body;

    const imageUrls = [];

    for (const file of req.files) {
      console.log("🔼 Uploading to Cloudinary:", file.path);
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);

      // ✅ Delete file after upload
      fs.unlinkSync(file.path);
    }

    const newItem = await Item.create({
      title,
      description,
      category,
      size,
      condition,
      tags: tags.split(',').map(tag => tag.trim()),
      images: imageUrls,
      userId: req.user._id,
      isFeatured: isFeatured || false,
    });

    console.log("✅ Item created:", newItem);

    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Error creating item:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all items (with optional filters)
export const getAllItems = async (req, res) => {
  const { category, tags, search, featured } = req.query;
  const query = {};

  if (category) query.category = category;
  if (featured) query.isFeatured = true;
  if (tags) query.tags = { $in: tags.split(',') };
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const items = await Item.find(query).populate('userId', 'name avatar');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name avatar');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all items of a user (except one)
export const getUserItems = async (req, res) => {
  const { exclude } = req.query;

  try {
    const query = { userId: req.params.userId };
    if (exclude) query._id = { $ne: exclude };

    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
