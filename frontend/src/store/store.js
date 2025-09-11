import { configureStore } from '@reduxjs/toolkit';
import shopsReducer from './slices/shopsSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    shops: shopsReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
