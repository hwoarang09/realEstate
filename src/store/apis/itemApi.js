import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import pause from "../../utils/pause";
const itemApi = createApi({
  reducerPath: "item",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      removeItem: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("in itemApi, removeItem, arg : ", arg);

          return [{ type: "item", id: arg.id }];
        },
        query: (item) => {
          return {
            url: `/item/${item.id}`,
            method: "DELETE",
          };
        },
      }),
      addItem: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("in itemApi, addItem, arg : ", arg);
          return [{ type: "item", id: arg.id }];
        },
        query: (user) => {
          return {
            url: "/item",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchItems: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.map((item) => {
            return { type: "item", id: item.id };
          });
          tags.push({ type: "item", id: arg.id });
          console.log("in itemApi, fetchItems, arg : ", arg);
          console.log("in itemApi, fetchItems, tags : ", tags);

          return tags;
        },
        query: (id) => {
          console.log("in fetchItems, id : ", id);
          return {
            url: "/item",
            params: {
              id: id.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchItemsQuery, useAddItemMutation, useRemoveItemMutation } =
  itemApi;
export { itemApi };

