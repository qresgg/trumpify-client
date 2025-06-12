import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    isAuthenticated: false,
    user: {
      user_avatar_url: null,
      user_id: null,
      user_name: null,
      user_email: null,
      user_likedSongsCount: null,
      user_likedSongsList: null,
      user_library: null
    },
    artist: {
      artist_id: null,
      artist_name: null,
      artist_isVerified: null,
      artist_avatar: null,
      artist_banner: null,
    }
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
    setUserName: (state, action) => {
      const { username } = action.payload;
      state.user_name = username;
    },
    setAvatarUrl: (state, action) => {
      const { avatar } = action.payload;
      state.user_avatar_url = avatar;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setData, setUserName, setAvatarUrl, setAuthenticated } = dataSlice.actions;
export default dataSlice.reducer;