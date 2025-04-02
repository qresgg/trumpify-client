import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    user: {
      user_avatar_url: null,
      user_id: null,
      user_name: null,
      user_email: null,
      user_likedSongsCount: null,
      user_likedSongsList: null
    },
    artist: {
      artist_id: null,
      artist_name: null 
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
    }
  },
});

export const { setData, setUserName, setAvatarUrl} = dataSlice.actions;
export default dataSlice.reducer;