import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import shopsRouter from './routes/shops.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/shops', shopsRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.send('Flower API is up'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
