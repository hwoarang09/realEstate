import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      // Only set the Authorization header for non-uploadFile requests
      if (endpoint !== "uploadFile") {
        headers.set("Authorization", apiKey);
      }
      return headers;
    },
  }),
  tagTypes: ["Property", "Comment"],
  endpoints(builder) {
    return {
      uploadFile: builder.mutation({
        query: ({ uploadUrl, url, file }) => ({
          url: uploadUrl,
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        }),
        transformResponse: (response, meta, arg) => {
          return {
            id: null,
            key: arg.file.name,
            url: arg.url,
            is_thumbnail: false,
          };
        },
      }),
      getUploadUrl: builder.query({
        query: ({ fileName, contentType }) => ({
          url: `/utils/upload/url`,
          params: { fileName, contentType },
          method: "GET",
          mode: "cors",
        }),
      }),
      updateProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          const tag = { type: "Property", id: parseInt(arg.id) };
          console.log("updateProperty invalidatesTags:", [tag]);
          return [tag];
        },
        query: ({ id, ...patch }) => ({
          url: `/property/${id}`,
          method: "PATCH",
          body: patch,
        }),
      }),
      removeProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Property", id: arg.id }];
        },
        query: (property) => ({
          url: `/property/${property.id}`,
          method: "DELETE",
        }),
      }),
      addProperty: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Property", id: arg.id }];
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
        // providesTags: (result, error, arg) => {
        //   if (!result?.contents) return []; // 데이터가 없으면 빈 배열 반환

        //   const tags = result.contents.map((property) => ({
        //     type: "Property",
        //     id: parseInt(property.id),
        //   }));
        //   console.log("fetchProperties providesTags:", tags);
        //   return tags;
        // },
        query: ({ page, is_verified, limit, ...params }) => {
          console.log(
            "page:",
            page,
            "is_verified:",
            is_verified,
            "limit:",
            limit,
            "params:",
            params
          );
          return {
            url: "/property",
            params: { is_verified, page, limit, ...params },
            method: "GET",
          };
        },
      }),
      fetchPropertyById: builder.query({
        // providesTags: (result, error, arg) => {
        //   return [
        //     { type: "Property", id: parseInt(arg) },
        //     { type: "CommentAll", id: parseInt(arg) },
        //   ];
        // },
        query: (id) => ({
          url: `/property/${id}`,
          method: "GET",
        }),
      }),

      updateComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [
            { type: "Comment", id: parseInt(arg.comment_id) },
            { type: "CommentAll", id: parseInt(arg.resource_id) },
          ];
        },
        query: ({ resource_id, comment_id, value }) => ({
          url: `/comment/${comment_id}`,
          method: "PATCH",
          body: { value },
        }),
      }),
      removeComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [
            { type: "Comment", id: parseInt(arg.comment_id) },
            { type: "CommentAll", id: parseInt(arg.resource_id) },
          ];
        },
        query: ({ resource_id, comment_id }) => ({
          url: `/comment/${comment_id}`,
          method: "DELETE",
        }),
      }),
      addComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "CommentAll", id: parseInt(arg.resource_id) }];
        },
        query: ({ resource_type, resource_id, value }) => ({
          url: "/comment",
          method: "POST",
          params: { resource_type, resource_id },
          body: { value },
        }),
      }),
      fetchComments: builder.query({
        // providesTags: (result, error, arg) => {
        //   const tags = result.contents.data.map((comment) => ({
        //     type: "Comment",
        //     id: comment.id,
        //   }));
        //   tags.push({ type: "Property", id: arg.resource_id });
        //   return tags;
        // },
        query: ({ resource_type, resource_id }) => ({
          url: "/comment",
          params: { resource_type, resource_id },
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useUploadFileMutation,
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
} = api;
export { api };
