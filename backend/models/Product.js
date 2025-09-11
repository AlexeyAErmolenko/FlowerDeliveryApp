import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, default: 0 },
  photo: String, // Cloudinary URL
  isFavorite: { type: Boolean, default: false },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Product', ProductSchema);
