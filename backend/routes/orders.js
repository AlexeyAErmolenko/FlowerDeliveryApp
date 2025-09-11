import express from 'express';
import Order from '../models/Order.js';
import Shop from '../models/Shop.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  const { items, email, phone, deliveryAddress, deliveryLocation, shopId } =
    req.body;
  // compute total
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  const order = new Order({
    items,
    total,
    email,
    phone,
    deliveryAddress,
    deliveryLocation,
    shop: shopId,
    createdAtUTC: new Date(), // UTC stored
  });

  await order.save();
  res.status(201).json({ orderId: order._id });
});

// Get order details
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid id' });
  const order = await Order.findById(id)
    .populate('shop')
    .populate('items.productId');
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

export default router;
