import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import pause from "../../utils/pause";
const itemApi = createApi({
  reducerPath: "item",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeItem: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("arg : ", arg);
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
          tags.push({ type: "Items..?", id: arg.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/item",
            params: {
              userId: user.id,
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
