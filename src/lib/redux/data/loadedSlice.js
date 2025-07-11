import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  users: [],
  artists: [],
};

const loadedSlice = createSlice({
  name: "loaded",
  initialState,
  reducers: {
    addToLoadedOne: (state, action) => {
      const { type, value } = action.payload;
      const targetArray = state[`${type}s`];
      if (!targetArray) return;

      const alreadyExists = targetArray.some(item => item._id === value._id);
      if (!alreadyExists) {
        targetArray.push({ data: value, lastUpdated: Date.now()});
      }
    },
    clearOldData: (state) => {
      const FIVE_MIN = 15 * 1000;
      const now = Date.now();

      for (const key of Object.keys(state)) {
        const arr = state[key];
        if (!Array.isArray(arr)) continue;

        state[key] = arr.filter(item => {
          if (!item.lastUpdated) return true;
          return now - item.lastUpdated <= FIVE_MIN;
        });
      }
    },
    addToLoadedMany: (state, action) => {
      const { type, values } = action.payload;
      const targetArray = state[`${type}s`];
      if (!targetArray) return;

      values.forEach(item => {
        const alreadyExists = targetArray.some(i => i.data._id === item._id);
        if (!alreadyExists) {
          targetArray.push({ data: item, lastUpdated: Date.now() });
        }
      });
    },
  },
});

export const { addToLoadedOne, addToLoadedMany, clearOldData } = loadedSlice.actions;
export default loadedSlice.reducer;
