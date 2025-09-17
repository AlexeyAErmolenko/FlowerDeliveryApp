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

  const favorites = await Product.find({
    ...baseFilter,
    isFavorite: true,
  }).sort(sortObj);
  const nonFav = await Product.find({
    ...baseFilter,
    isFavorite: { $ne: true },
  })
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

router.patch('/:id/favorite', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isFavorite = !product.isFavorite;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
export default router;
