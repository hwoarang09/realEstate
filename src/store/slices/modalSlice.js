import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalPath: null,
  selectedProperty: null,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload.modalPath;
      state.selectedProperty = action.payload.selectedProperty;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalPath = null;
      state.selectedProperty = null;
    },
    setModalPath: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload.modalPath;

    },
  },
});

export const { openModal, closeModal, setModalPath } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
