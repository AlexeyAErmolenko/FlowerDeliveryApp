import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as apiFetchProducts } from '../../api/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ shopId, page, limit, sort, order }) => {
    return await apiFetchProducts({ shopId, page, limit, sort, order });
  },
);

export const toggleFavorite = createAsyncThunk(
  'products/toggleFavorite',
  async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${id}/favorite`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return await res.json();
  },
);

const slice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    total: 0,
    status: 'idle',
    page: 1,
    limit: 6,
    sort: 'date',
    order: 'desc',
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.items = a.payload.items;
        s.total = a.payload.total;
        s.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (s) => {
        s.status = 'failed';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      });
  },
});

export const { setPage, setSort } = slice.actions;
export default slice.reducer;
