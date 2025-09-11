import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as apiFetchProducts } from '../../api/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ shopId, page, limit, sort, order }) => {
    return await apiFetchProducts({ shopId, page, limit, sort, order });
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
      });
  },
});

export const { setPage, setSort } = slice.actions;
export default slice.reducer;
