import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const propertyApi = createApi({
  reducerPath: "property",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", apiKey);
      return headers;
    },
  }),
  tagTypes: ["Property", "Test"],
  endpoints(builder) {
    return {
      updateProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Property", id: parseInt(arg.id) }, "Test"];
        },
        query: ({ id, ...patch }) => ({
          url: `/property/${id}`,
          method: "PATCH",
          body: patch,
        }),
      }),
      removeProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Property", id: arg.id }, "Test"];
        },
        query: (property) => ({
          url: `/property/${property.id}`,
          method: "DELETE",
        }),
      }),
      addProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Property", id: arg.id }, "Test"];
        },
        query: (property) => ({
          url: "/property",
          method: "POST",
          body: {
            propertyId: property.id,
            title: faker.commerce.productName(),
          },
        }),
      }),

      fetchProperties: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.contents.map((property) => ({
            type: "Property",
            id: property.id,
          }));

          console.log("in fetchProperties, arg:", arg);
          console.log("in fetchProperties, tags:", tags);
          return [...tags, "Test"];
        },
        query: ({ page, is_verified, limit }) => ({
          url: "/property",
          params: { is_verified, page, limit },
          method: "GET",
        }),
      }),
      fetchPropertyById: builder.query({
        providesTags: (result, error, arg) => {
          console.log("in fetchPropertyById, arg:", arg);
          console.log("in fetchPropertyById, tags:", {
            type: "Property",
            id: parseInt(arg),
          });
          return [{ type: "Property", id: parseInt(arg) }, "Test"];
        },
        query: (id) => ({
          url: `/property/${id}`,
          method: "GET",
        }),
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
