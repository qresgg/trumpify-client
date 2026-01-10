import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  //   заготовка для глобальних меседжів (не юзається)
  globalMessage: {
    error: [],
    success: []
  },
    mobileStates: {
        library: false,
        songInfo: false
    }
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
    setGlobalMessage: (state, action) => {
      const { type, message } = action.payload;
      if (type === "error") {
        state.globalMessage.error.push(message);
      } else if (type === "success") {
        state.globalMessage.success.push(message);
      }
    },
    clearGlobalMessage: (state) => {
      state.globalMessage.error = [];
      state.globalMessage.success = [];
    },

    // MOBILE STATES
      toggleLibraryState(state, action) {
        if(typeof action.payload === "boolean") {
            state.mobileStates.library = action.payload;
        } else {
            state.mobileStates.library = !state.mobileStates.library
        }
      },
      toggleSongInfoState(state, action) {
        if (typeof action.payload === "boolean") {
            state.mobileStates.songInfo = action.payload;
        } else {
            state.mobileStates.songInfo = !state.mobileStates.songInfo;
        }
      }
  },
});

export const {
  setView,
  setModalView,
  setAuthView,
  setGlobalMessage,
  clearGlobalMessage,

    toggleLibraryState,
    toggleSongInfoState,
} = viewSlice.actions;
export default viewSlice.reducer;
