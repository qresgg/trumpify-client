import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: { 
    currentView: "home", 
    settingsView: "account",
    currentUserPage: null,
    currentArtistPage: null,
    currentPlaylistPage: null,
    modal: {
      modalState: false
    }
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
    }, 
    setModalState: (state, action) => {
      state.modal.modalState = action.payload;
    } 
  },
});

export const { setView, setSettingsView, setSelectedArtistPage, setSelectedPlaylistPage, setSelectedUserPage, setModalState } = viewSlice.actions;
export default viewSlice.reducer;