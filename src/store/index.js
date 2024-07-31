import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api} from "./apis/propertyApi";
// import { commentApi } from "./apis/commentApi";

const store = configureStore({
  reducer: {
    modals: modalReducer,
    [api.reducerPath]: api.reducer,
    // [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  // .concat(commentApi.middleware),
});
setupListeners(store.dispatch);

export { store, modalReducer, openModal, closeModal };
export {
  useLazyGetUploadUrlQuery,
  useFetchPropertiesQuery,
  useFetchPropertyByIdQuery,
  useAddPropertyMutation,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from "./apis/propertyApi";

// export {
//   useFetchCommentsQuery,
//   useAddCommentMutation,
//   useRemoveCommentMutation,
//   useUpdateCommentMutation,
// } from "./apis/commentApi";