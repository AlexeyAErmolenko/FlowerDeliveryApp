import mongoose from 'mongoose';
const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  website: String,
  location: {
    // optional geo info for map: { lat, lng }
    lat: Number,
    lng: Number,
  },

  //   createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Shop', ShopSchema);
