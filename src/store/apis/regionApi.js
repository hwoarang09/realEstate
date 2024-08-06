import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_AUTH_TOKEN_ADMIN;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const regionApi = createApi({
  reducerPath: "regionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "uploadFile") {
        headers.set("Authorization", apiKey);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      fetchBasicInfo: builder.query({
        query: ({ address }) => {
          return {
            url: "/region/basic_info",
            params: { address },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchBasicInfoQuery } = regionApi;
export { regionApi };
