import apiSlice from "../../api/apiSlice";

const roomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/rooms",
        body: data,
        method: "POST",
      }),
    }),
    rooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      })
    })
  }),
});

export default roomApi;
export const { useCreateRoomMutation, useRoomsQuery } = roomApi;
