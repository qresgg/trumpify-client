import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    modalStateShowCropperArtistConfig: false,
    modalStateShowCropperCover: false,

    modalStateDropDownMenu: false,
    modalStateSearchMenu: false
  },
  auth: {
    currentView: "login",
  },
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action) => {
      const { view, value } = action.payload;
      state[view] = value;
    },

    setModalView: (state, action) => {
      const { view, value } = action.payload;
      state.modal[view] = value;
    },

    setAuthView: (state, action) => {
      state.auth.currentView = action.payload;
    },

    
  },
});

export const {
  setSettingsView,
  setSelectedArtistPage,
  setSelectedPlaylistPage,
  setSelectedUserPage,

  setModalStateSongCreate,
  setModalStateHomePage,
  setModalStateUserPage,
  setModalStateShowCropperUserPage,
  setModalStateShowCropperCover,
  setModalStateShowCropperArtistConfig,

  setView,
  setModalView,
  setAuthView,
} = viewSlice.actions;
export default viewSlice.reducer;
