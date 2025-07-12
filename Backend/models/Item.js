import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  size: String,
  condition: String,
  tags: [String],
  images: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'swapped'], default: 'available' },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
