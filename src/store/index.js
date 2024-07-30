import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { propertyApi } from "./apis/propertyApi";
import { listApi } from "./apis/listApi";

const store = configureStore({
  reducer: {
    modals: modalReducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApi.middleware)
      .concat(listApi.middleware),
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
  useFetchListsQuery,
  useAddListMutation,
  useRemoveListMutation,
  useUpdateListMutation,
} from "./apis/listApi";