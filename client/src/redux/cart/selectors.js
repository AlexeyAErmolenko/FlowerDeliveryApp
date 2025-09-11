import { createSelector } from '@reduxjs/toolkit';

export const selectIsSorting = (state) => state.carts.isSorting;
export const selectCarts = (state) => state.carts.items;
export const selectLoading = (state) => state.carts.loading;
export const selectError = (state) => state.carts.error;
export const selectCurrentIdCart = (state) => state.carts.currentIdCart;
export const selectIsOpenModalWindow = (state) => state.carts.isOpenModalWindow;

export const selectCurrentCart = createSelector(
  [selectCarts, selectCurrentIdCart],
  (carts, currentIdCart) => {
    return carts.find((cart) => cart.id === currentIdCart);
  },
);

// export const selectCurrentCarts = createSelector(
//   [selectCarts, selectNameFilter],
//   (carts, filter) => {
//     return carts.filter(
//       (cart) =>
//         cart.name.toLowerCase().includes(filter.toLowerCase()) ||
//         cart.number.includes(filter)
//     );
//   }
// );
