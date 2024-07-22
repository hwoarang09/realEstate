import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    modals: modalReducer,
  },
});

export { store, modalReducer, openModal, closeModal };
