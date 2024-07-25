import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import pause from "../../utils/pause";
const listApi = createApi({
  reducerPath: "list",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      removeList: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("arg : ", arg);
          return [{ type: "list", id: arg.id }];
        },
        query: (list) => {
          return {
            url: `/list/${list.id}`,
            method: "DELETE",
          };
        },
      }),
      addList: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "list", id: arg.id }];
        },
        query: (user) => {
          return {
            url: "/list",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchLists: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.map((list) => {
            return { type: "list", id: list.id };
          });
          tags.push({ type: "lists..?", id: arg.id });
          return tags;
        },
        query: (list) => {
          console.log("listApi, query, list : ", list);
          return {
            url: "/list",
            params: {
              pageNum: list.pageNum,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchListsQuery, useAddListMutation, useRemoveListMutation } =
  listApi;
export { listApi };
