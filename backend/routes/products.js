import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// GET /api/products?shopId=...&page=1&limit=6&sort=price|date&order=asc|desc
router.get('/', async (req, res) => {
  const {
    shopId,
    page = 1,
    limit = 6,
    sort = 'date',
    order = 'desc',
  } = req.query;
  const skip = (Math.max(1, page) - 1) * limit;

  // sorting: favorite first, then requested sort
  const sortObj = {};
  if (sort === 'price') sortObj.price = order === 'asc' ? 1 : -1;
  else sortObj.createdAt = order === 'asc' ? 1 : -1;

  // fetch favorites separately to ensure favorites appear first
  const baseFilter = {};
  if (shopId) baseFilter.shopId = shopId;

  const favorites = await Product.find({ ...baseFilter, favorite: true }).sort(
    sortObj,
  );
  const nonFav = await Product.find({ ...baseFilter, favorite: { $ne: true } })
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit));

  // total count for pagination
  const total = await Product.countDocuments(baseFilter);

  const items = [...favorites, ...nonFav];

  res.json({ items, total });
});

// create product
// router.post('/', async (req, res) => {
//   const p = new Product(req.body);
//   await p.save();
//   res.status(201).json(p);
// });

export default router;
