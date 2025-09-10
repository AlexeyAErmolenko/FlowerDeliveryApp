import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
import { fetchAll, addContact, editContact, deleteContact } from './operations';

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    currentIdContact: null,
    loading: false,
    error: null,
    isOpenModalWindow: false,
    isSorting: false,
  },
  reducers: {
    setCurrentIdContact: (state, action) => {
      state.currentIdContact = action.payload;
    },
    toggleModalWindow: (state) => {
      state.isOpenModalWindow = !state.isOpenModalWindow;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAll.pending, handlePending)
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.isSorting = true;
      })
      .addCase(fetchAll.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.isSorting = true;
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        const contact = state.items.find(
          (item) => item.id === action.payload.id,
        );
        if (contact) {
          Object.assign(contact, action.payload);
        }
        state.loading = false;
        state.currentIdContact = null;
        state.isSorting = true;
      })
      .addCase(editContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.currentIdContact = null;
        state.isOpenModalWindow = false;
        state.isSorting = true;
      })
      .addCase(logOut.rejected, handleRejected),
});

export const { setCurrentIdContact, toggleModalWindow } = slice.actions;
export default slice.reducer;
