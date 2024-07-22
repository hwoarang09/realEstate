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
      console.log(`in openModal, state ${JSON.stringify(state)}`);
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalPath = null;
      state.selectedProperty = null;
    },
    setModalPath: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload.modalPath;
      //state.selectedProperty = action.payload.selectedProperty;
      console.log(
        `in setModalPath, state ${JSON.stringify(
          state
        )} action ${JSON.stringify(action)}`
      );
    },
  },
});

export const { openModal, closeModal, setModalPath } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
