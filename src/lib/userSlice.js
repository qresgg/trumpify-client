import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    user: {
      urlAvatar: "",
      userId: "",
      userName: "",
      userEmail: "",
      artistName: ""
    },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUrlAvatar: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setUserName, setUser, setUrlAvatar } = userSlice.actions;
export default userSlice.reducer;