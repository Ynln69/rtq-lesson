import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://64674adeba7110b663b466b2.mockapi.io";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (build) => ({
    getComments: build.query({
      query: () => ({ url: `/comments` }),
      providesTags: ["comments"],
    }),
    addComment: build.mutation({
      query: (body) => ({ url: `/comments`, method: "POST", body }),
      invalidatesTags: ["comments"],
    }),
    updateCommentCount: build.mutation({
      query: ({ id, body }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentCountMutation,
} = commentApi;
