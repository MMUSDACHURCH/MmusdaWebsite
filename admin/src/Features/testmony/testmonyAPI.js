import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export const adminTestmonyAPI = createApi({
  reducerPath: "adminTestmonyAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${APIDomain}/api/testimonies` }),
  tagTypes: ["Testimonies"],
  endpoints: (builder) => ({
    getAllTestimonies: builder.query({
      query: () => "/",
      providesTags: ["Testimonies"]
    }),
    deleteTestimony: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Testimonies"]
    }),
    updateTestimony: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Testimonies"]
    })
  })
});

export const {
  useGetAllTestimoniesQuery,
  useDeleteTestimonyMutation,
  useUpdateTestimonyMutation
} = adminTestmonyAPI;