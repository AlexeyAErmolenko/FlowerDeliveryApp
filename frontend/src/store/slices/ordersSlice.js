import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder as apiCreateOrder,
  getOrder as apiGetOrder,
} from '../../api/api';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (payload) => {
    return await apiCreateOrder(payload);
  },
);

export const fetchOrder = createAsyncThunk('orders/get', async (id) => {
  return await apiGetOrder(id);
});

const slice = createSlice({
  name: 'orders',
  initialState: { current: null, status: 'idle' },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.fulfilled, (s, a) => {
        s.current = a.payload;
      })
      .addCase(fetchOrder.fulfilled, (s, a) => {
        s.current = a.payload;
      });
  },
});
export default slice.reducer;
