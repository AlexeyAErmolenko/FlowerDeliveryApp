import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('flower_delivery');
const shopsCollection = db.collection('shops');
const productsCollection = db.collection('products');

app.get('/', (req, res) => {
  res.send('Flower API is running!');
});

// Отримати всі магазини
app.get('/shops', async (req, res) => {
  const shops = await shopsCollection.find().toArray();
  res.json(shops);
});

// Отримати товари конкретного магазину
app.get('/products/:shopId', async (req, res) => {
  const products = await productsCollection
    .find()
    .toArray({ shopId: new ObjectId(req.params.shopId) });
  if (!products) return res.status(404).json({ error: 'Products not found' });
  res.json(products);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
