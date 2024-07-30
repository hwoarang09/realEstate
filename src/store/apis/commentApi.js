import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", apiKey);
      return headers;
    },
  }),
  tagTypes: ["Comment", "Property", "Test"], // 태그 유형 정의
  endpoints(builder) {
    return {
      updateComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          const tags = [
            { type: "Comment", id: parseInt(arg.comment_id) },
            { type: "Property", id: parseInt(arg.resource_id) },
            "Test",
          ];
          console.log("in commentAPI tags", tags);
          return tags;
        },
        query: ({ resource_id, comment_id, value }) => {
          console.log(
            "in commentApi, updateComment, resource_id:",
            resource_id,
            comment_id
          );
          console.log("in commentApi, updateComment, value:", value);
          return {
            url: `/comment/${comment_id}`,
            method: "PATCH",
            body: { value },
          };
        },
      }),
      removeComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("removeComment arg:", arg);
          console.log("removeComment tags:", [
            { type: "Comment", id: parseInt(arg.comment_id) },
            { type: "Property", id: parseInt(arg.resource_id) },
          ]);
          return [
            { type: "Comment", id: parseInt(arg.comment_id) },
            { type: "Property", id: parseInt(arg.resource_id) },
            "Test",
          ];
        },
        query: ({ resource_id, comment_id }) => {
          console.log("in removeComment, resource_id:", resource_id);
          console.log("in removeComment, comment_id:", comment_id);
          return {
            url: `/comment/${comment_id}`,
            method: "DELETE",
          };
        },
      }),
      addComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("addComment arg:", arg);
          console.log("addComment tag:", {
            type: "Property",
            id: arg.resource_id,
          });
          console.log("addComment result:", result);
          return [{ type: "Property", id: parseInt(arg.resource_id) }, "Test"];
        },
        query: ({ resource_type, resource_id, value }) => ({
          url: "/comment",
          method: "POST",
          params: {
            resource_type,
            resource_id,
          },
          body: { value },
        }),
      }),
      fetchComments: builder.query({
        providesTags: (result, error, arg) => {
          console.log("result:", result);
          const tags = result.contents.data.map((comment) => ({
            type: "Comment",
            id: comment.id,
          }));
          tags.push({ type: "Property", id: arg.resource_id });
          return tags;
        },
        query: ({ resource_type, resource_id }) => {
          console.log("commentApi, query, comment:", {
            resource_type,
            resource_id,
          });
          return {
            url: "/comment",
            params: { resource_type, resource_id },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
export { commentApi };
