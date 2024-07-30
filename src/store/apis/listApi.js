import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const listApi = createApi({
  reducerPath: "list",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", apiKey);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      updateList: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "list", id: arg.id }];
        },
        query: ({ id, ...patch }) => ({
          url: `/property/${id}`,
          method: "PATCH",
          body: patch,
        }),
      }),
      removeList: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("arg:", arg);
          return [{ type: "list", id: arg.id }];
        },
        query: (list) => {
          return {
            url: `/property/${list.id}`,
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
            url: "/property",
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
          console.log("result:", result);
          const tags = result.contents.map((list) => {
            return { type: "list", id: list.id };
          });
          tags.push({ type: "listPage", id: arg.page });
          return tags;
        },
        query: ({ page, is_verified, limit }) => {
          console.log("listApi, query, list:", {
            page,
            is_verified,
            limit,
          });
          return {
            url: "/property",
            params: {
              is_verified,
              page,
              limit,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchListsQuery,
  useAddListMutation,
  useRemoveListMutation,
  useUpdateListMutation,
} = listApi;
export { listApi };
