import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { propertyApi } from "./apis/propertyApi";
import { commentApi } from "./apis/commentApi";

const store = configureStore({
  reducer: {
    modals: modalReducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApi.middleware)
      .concat(commentApi.middleware),
});
setupListeners(store.dispatch);

export { store, modalReducer, openModal, closeModal };
export {
  useFetchPropertiesQuery,
  useFetchPropertyByIdQuery,
  useAddPropertyMutation,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
} from "./apis/propertyApi";

export {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from "./apis/commentApi";