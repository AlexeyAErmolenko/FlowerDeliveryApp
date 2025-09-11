import { MongoClient, ObjectId } from 'mongodb';
import { Router } from 'express';

import getEnvVar from '../utils/getEnvVar.js';

const router = Router();

const db = getEnvVar('MONGODB_DB');
const shopsCollection = db.collection('shops');
const productsCollection = db.collection('products');

router.get('/', (req, res) => {
  res.send('Flower API is running 🚀');
});

router.get('/shops', async (req, res) => {
  const shops = await shopsCollection.find().toArray();
  res.json(shops);
});

router.get('/products/:shopId', async (req, res) => {
  const shopId = req.params;
  const products = await productsCollection.find().toArray({ shopId });
  if (!products) return res.status(404).json({ error: 'Products not found' });
  res.json(products);
});

export default router;
