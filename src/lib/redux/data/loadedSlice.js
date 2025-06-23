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
        targetArray.push(value);
      }
    },
    addToLoadedMany: (state, action) => {
      const { type, values } = action.payload;
      const targetArray = state[`${type}s`];
      if (!targetArray) return;

      values.forEach(item => {
        const alreadyExists = targetArray.some(i => i._id === item._id);
        if (!alreadyExists) {
          targetArray.push(item);
        }
      });
    },
  },
});

export const { addToLoadedOne, addToLoadedMany } = loadedSlice.actions;
export default loadedSlice.reducer;
