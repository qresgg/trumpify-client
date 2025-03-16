import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: { currentView: "home", settingsView: "account" },
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
    setSettingsView: (state, action) => {
      state.settingsView = action.payload
    }
  },
});

export const { setView, setSettingsView } = viewSlice.actions;
export default viewSlice.reducer;