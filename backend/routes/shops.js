import express from 'express';
import Shop from '../models/Shop.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const shops = await Shop.find().sort({ name: 1 });
  res.json(shops);
});

// router.post('/', async (req, res) => {
//   const s = new Shop(req.body);
//   await s.save();
//   res.status(201).json(s);
// });

export default router;
