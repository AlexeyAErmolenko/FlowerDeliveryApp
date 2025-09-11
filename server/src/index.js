// import initMongoConnection from './db/initMongoConnection.js';
// import startServer from './server.js';

// const bootstrap = async () => {
//   await initMongoConnection();
//   startServer();
// };

// void bootstrap();

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
const db = client.db('flowerDB');
const shopsCollection = db.collection('shops');

app.get('/', (req, res) => {
  res.send('Flower API is running 🚀');
});

// Отримати всі магазини
app.get('/shops', async (req, res) => {
  const shops = await shopsCollection.find().toArray();
  res.json(shops);
});

// Отримати товари конкретного магазину
app.get('/shops/:id/products', async (req, res) => {
  const shop = await shopsCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  if (!shop) return res.status(404).json({ error: 'Shop not found' });
  res.json(shop.products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
