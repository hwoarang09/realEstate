import { configureStore } from "@reduxjs/toolkit";
import {
  modalReducer,
  openModal,
  closeModal,
  setScrollPosition,
} from "./slices/modalSlice";
import isListReducer from "./slices/headerSlice";
import searchFilterReducer from "./slices/searchFilterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "./apis/propertyApi";
import { regionApi } from "./apis/regionApi";
// import { commentApi } from "./apis/commentApi";

const store = configureStore({
  reducer: {
    modals: modalReducer,
    isList: isListReducer,
    searchFilter: searchFilterReducer,
    [api.reducerPath]: api.reducer,
    [regionApi.reducerPath]: regionApi.reducer,
    // [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(regionApi.middleware),
  // .concat(commentApi.middleware),
});
setupListeners(store.dispatch);

export { store, modalReducer, openModal, closeModal, setScrollPosition };
export {
  useUploadFileMutation,
  useLazyGetUploadUrlQuery,
  useFetchPropertiesQuery,
  useLazyFetchPropertiesQuery,
  useFetchPropertyByIdQuery,
  useAddPropertyMutation,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from "./apis/propertyApi";

export { useFetchBasicInfoQuery } from "./apis/regionApi";
// export { useFetchCommentListQuery } from "./apis/commentApi";