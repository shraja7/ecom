import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
    }),
    keepUnusedDataFor: 5,
  }),
  name: "ordersApi",
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
