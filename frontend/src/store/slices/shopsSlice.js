import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShops as apiFetchShops } from '../../api/api';

export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
  return await apiFetchShops();
});

const slice = createSlice({
  name: 'shops',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShops.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (s, a) => {
        s.items = a.payload;
        s.status = 'succeeded';
      });
  },
});

export default slice.reducer;
