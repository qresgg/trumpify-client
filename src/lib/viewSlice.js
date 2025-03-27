import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: { 
    currentView: "home", 
    settingsView: "account",
    currentUserPage: null,
    currentArtistPage: null,
    currentPlaylistPage: null
  },
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
    setSettingsView: (state, action) => {
      state.settingsView = action.payload
    },
    setSelectedArtistPage: (state, action) => {
      state.currentArtistPage = action.payload;
    },
    setSelectedUserPage: (state, action) => {
      state.currentUserPage = action.payload;
    },
    setSelectedPlaylistPage: (state, action) => {
      state.currentPlaylistPage = action.payload;
    }
  },
});

export const { setView, setSettingsView, setSelectedArtistPage, setSelectedPlaylistPage, setSelectedUserPage } = viewSlice.actions;
export default viewSlice.reducer;