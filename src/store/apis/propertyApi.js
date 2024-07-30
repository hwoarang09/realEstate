import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
// import pause from "../../utils/pause";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const propertyApi = createApi({
  reducerPath: "property",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", apiKey);
      console.log("Headers prepared:", headers);
      return headers;
    },
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      updateProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "property", id: arg.id }];
        },
        query: ({ id, ...patch }) => ({
          url: `/property/${id}`,
          method: "PATCH",
          body: patch,
        }),
      }),
      removeProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("in propertyApi, removeProperty, arg : ", arg);

          return [{ type: "property", id: arg.id }];
        },
        query: (property) => {
          return {
            url: `/property/${property.id}`,
            method: "DELETE",
          };
        },
      }),
      addProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("in propertyApi, addProperty, arg : ", arg);
          return [{ type: "property", id: arg.id }];
        },
        query: (property) => {
          return {
            url: "/property",
            method: "POST",
            body: {
              propertyId: property.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),

      fetchProperties: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.contents.map((property) => {
            return { type: "property", id: property.id };
          });
          tags.push({ type: "property", id: arg.id });
          console.log("in propertyApi, fetchProperties, arg : ", arg);
          console.log("in propertyApi, fetchProperties, tags : ", tags);

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
      fetchPropertyById: builder.query({
        query: (id) => `/property/${id}`,
      }),
    };
  },
});

export const {
  useFetchPropertiesQuery,
  useFetchPropertyByIdQuery,
  useAddPropertyMutation,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
} = propertyApi;
export { propertyApi };
