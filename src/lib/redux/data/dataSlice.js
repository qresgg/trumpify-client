import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    isAuthenticated: false,
    user: {
      _id: null,
      definition: null,
      user_avatar_url: null,
      user_name: null,
      user_email: null,
      user_likedSongsCount: null,
      user_likedSongsList: null,
      user_library: null
    },
    artist: {
      _id: null,
      definition: null,
      artist_name: null,
      artist_is_verified: null,
      artist_avatar: null,
      artist_banner: null,
      artist_bio: null
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