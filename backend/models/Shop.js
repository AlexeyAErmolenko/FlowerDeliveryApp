import mongoose from 'mongoose';
const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    website: String,
    location: { lat: Number, lng: Number },
  },
  { versionKey: false, timestamps: false },
);
export default mongoose.model('Shop', ShopSchema);
