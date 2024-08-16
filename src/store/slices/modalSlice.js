import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalPath: null,
  selectedProperty: null,
  scrollPosition: 0,
  mapCenter: null,
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
      console.log("closeModal", state);
      state.isOpen = false;
      state.modalPath = null;
      state.selectedProperty = null;
    },
    setModalPath: (state, action) => {
      state.isOpen = true;
      state.modalPath = action.payload.modalPath;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setModalPath,
  setScrollPosition,
  setMapCenter,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
