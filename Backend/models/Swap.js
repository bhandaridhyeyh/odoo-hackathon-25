import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['swap', 'points'] },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Swap', swapSchema);
