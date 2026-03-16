import apiSlice from "../../api/apiSlice";

const activateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    activate: builder.mutation({
      query: (data) => ({
        url: "/auth/activate",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export default activateApi;
export const { useActivateMutation } = activateApi;
