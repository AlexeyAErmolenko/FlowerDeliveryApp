import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

export const fetchAll = createAsyncThunk(
  'carts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/carts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addCart = createAsyncThunk(
  'carts/addCart',
  async (newCart, thunkAPI) => {
    try {
      const response = await axios.post('/carts', newCart);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editCart = createAsyncThunk(
  'carts/editCart',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/carts/${id}`, {
        name,
        number,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteCart = createAsyncThunk(
  'carts/deleteCart',
  async (idCart, thunkAPI) => {
    try {
      const response = await axios.delete(`/carts/${idCart}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
