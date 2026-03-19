import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export const dedicationsAPI = createApi({
  reducerPath: "dedicationsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${APIDomain}/api` }),
  endpoints: (builder) => ({
    getAllDedications: builder.query({
      query: () => "/dedications"
    }),
    getFirstTwoDedications: builder.query({
      query: () => "/dedications"
    })
  })
});

export const { useGetAllDedicationsQuery, useGetFirstTwoDedicationsQuery } = dedicationsAPI;