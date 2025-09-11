import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shops: ['Flowery_Fragarant', 'Bloomwell', 'etc..', 'etc..'],
  selectedShop: 'Flowery_Fragarant',
  products: {
    Flowery_Fragarant: [
      { id: 1, name: 'Rose' },
      { id: 2, name: 'Tulip' },
      { id: 3, name: 'Lily' },
      { id: 4, name: 'Rose' },
    ],
    Bloomwell: [
      { id: 5, name: 'Orchid' },
      { id: 6, name: 'Chamomile' },
    ],
  },
};

const slice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    selectShop: (state, action) => {
      state.selectedShop = action.payload;
    },
  },
});

export const { selectShop } = slice.actions;
export default slice.reducer;
