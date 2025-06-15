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
      modalStateSongCreate: false,
      modalStateHomePage: false,
      modalStateUserPage: false,
      modalStateShowCropperUserPage: false,
      modalStateShowCropperCover: false
    },
    auth: {
      currentView: 'login'
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
    
    setModalStateSongCreate: (state, action) => {
      state.modal.modalStateSongCreate = action.payload;
    },
    setModalStateHomePage: (state, action) => {
      state.modal.modalStateHomePage = action.payload;
    },
    setModalStateUserPage: (state, action) => {
      state.modal.modalStateUserPage = action.payload;
    },
    setModalStateShowCropperUserPage: (state, action) => {
      state.modal.modalStateShowCropperUserPage = action.payload;
    },
    setModalStateShowCropperCover: (state, action) => {
      state.modal.modalStateShowCropperCover = action.payload;
    },

    setAuthView: (state, action) => {
      state.auth.currentView = action.payload;
    }
  },
});

export const { 
  setView, 
  setSettingsView, 
  setSelectedArtistPage, 
  setSelectedPlaylistPage, 
  setSelectedUserPage, 

  setModalStateSongCreate,
  setModalStateHomePage,
  setModalStateUserPage,
  setModalStateShowCropperUserPage,
  setModalStateShowCropperCover,

  setAuthView
} = viewSlice.actions;
export default viewSlice.reducer;