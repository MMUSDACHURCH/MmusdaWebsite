import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export const testimoniesAPI = createApi({
  reducerPath: "testimoniesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${APIDomain}/api` }),
  endpoints: (builder) => ({
    getAllTestimonies: builder.query({
      query: () => "/testimonies"
    }),
    getFirstTwoTestimonies: builder.query({
      query: () => "/testimonies"
    })
  })
});

export const { useGetAllTestimoniesQuery, useGetFirstTwoTestimoniesQuery } = testimoniesAPI;