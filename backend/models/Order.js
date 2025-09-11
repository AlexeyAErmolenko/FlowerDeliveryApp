import mongoose from 'mongoose';
const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  total: Number,
  email: String,
  phone: String,
  deliveryAddress: String,
  deliveryLocation: { lat: Number, lng: Number },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  createdAtUTC: { type: Date, default: () => new Date() }, // store UTC timestamp
});

export default mongoose.model('Order', OrderSchema);
