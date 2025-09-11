import { createSlice } from '@reduxjs/toolkit';

const LOCAL_KEY = 'flower_cart_v1';

const load = () => {
  try {
    const s = localStorage.getItem(LOCAL_KEY);
    return s ? JSON.parse(s) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const save = (state) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
};

const initial = load();

const slice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      const idx = state.items.findIndex((i) => i.productId === p.productId);
      if (idx >= 0) state.items[idx].quantity += p.quantity || 1;
      else state.items.push(p);
      save(state);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      save(state);
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const idx = state.items.findIndex((i) => i.productId === productId);
      if (idx >= 0) state.items[idx].quantity = quantity;
      save(state);
    },
    clearCart(state) {
      state.items = [];
      save(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  slice.actions;
export default slice.reducer;
