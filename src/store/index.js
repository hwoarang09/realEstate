import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, openModal, closeModal } from "./slices/modalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { itemApi } from "./apis/itemApi";
import { listApi } from "./apis/listApi";

const store = configureStore({
  reducer: {
    modals: modalReducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itemApi.middleware)
      .concat(listApi.middleware),
});
setupListeners(store.dispatch);

export { store, modalReducer, openModal, closeModal };
export {
  useFetchItemsQuery,
  useAddItemMutation,
  useRemoveItemMutation,
} from "./apis/itemApi";

export {
  useFetchListsQuery,
  useAddListMutation,
  useRemoveListMutation,
} from "./apis/listApi";