import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
      user: null,
      artist: null
  };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { user, artist } = action.payload;
      state.user = user;
      state.artist = artist;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;