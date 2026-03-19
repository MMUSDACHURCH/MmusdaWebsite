import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export const adminDedicationAPI = createApi({
  reducerPath: "adminDedicationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${APIDomain}/api/dedications` }),
  tagTypes: ["Dedications"],
  endpoints: (builder) => ({
    getAllDedications: builder.query({
      query: () => "/",
      providesTags: ["Dedications"]
    }),
    deleteDedication: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Dedications"]
    }),
    updateDedication: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Dedications"]
    })
  })
});

export const {
  useGetAllDedicationsQuery,
  useDeleteDedicationMutation,
  useUpdateDedicationMutation
} = adminDedicationAPI;