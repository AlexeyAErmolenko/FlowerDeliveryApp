import { createSelector } from '@reduxjs/toolkit';
// import { selectNameFilter } from "../filters/selectors";

export const selectIsSorting = (state) => state.contacts.isSorting;
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectCurrentIdContact = (state) =>
  state.contacts.currentIdContact;
export const selectIsOpenModalWindow = (state) =>
  state.contacts.isOpenModalWindow;

export const selectCurrentContact = createSelector(
  [selectContacts, selectCurrentIdContact],
  (contacts, currentIdContact) => {
    return contacts.find((contact) => contact.id === currentIdContact);
  },
);

// export const selectCurrentContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) => {
//     return contacts.filter(
//       (contact) =>
//         contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//         contact.number.includes(filter)
//     );
//   }
// );
