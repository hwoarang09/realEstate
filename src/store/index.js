import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export { store, modalReducer, openModal, closeModal };
