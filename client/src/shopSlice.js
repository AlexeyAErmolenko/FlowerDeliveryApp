import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchShops = createAsyncThunk('shop/fetchShops', async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/shops`);
  return res.json();
});

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (shopId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${shopId}`,
    );
    return res.json();
  },
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: { shops: [], products: [], selectedShop: null, status: 'idle' },
  reducers: {
    selectShop: (state, action) => {
      state.selectedShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.shops = action.payload;
        if (action.payload.length > 0) {
          state.selectedShop = action.payload[0]._id;
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { selectShop } = shopSlice.actions;
export default shopSlice.reducer;
