import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalPath: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalPath = null;
    },
    setModalPath: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalPath } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
