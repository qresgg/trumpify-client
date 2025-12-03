import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clearableData: {
    albums: [],
    users: [],
    artists: [],
  },
  nonClearableData: {
    regions: [],
    genres: [],
    languages: []
  }
};

const loadedSlice = createSlice({
  name: "loaded",
  initialState,
  reducers: {
    addToLoadedOne: (state, action) => {
      const { type, value } = action.payload;

      const clearableTypes = ['album', 'user', 'artist'];
      const nonClearableTypes = ['region', 'genre', 'language'];

      let targetArray;

      if (clearableTypes.includes(type)) {
        targetArray = state.clearableData[`${type}s`];
      } else if (nonClearableTypes.includes(type)) {
        targetArray = state.nonClearableData[`${type}s`];
      } else {
        return;
      }

      if (!targetArray) return;
      const alreadyExists = targetArray.some(item => {
        if (item.data && value._id) {
          return item.data._id === value._id;
        }
        return item._id === value._id;
      });

      if (!alreadyExists) {
        targetArray.push({ data: value, lastUpdated: Date.now() });
      }
    },
    clearOldData: (state) => {
      const FIVE_MIN = 15 * 1000;
      const now = Date.now();

      Object.keys(state.clearableData).forEach(key => {
        state.clearableData[key] = state.clearableData[key].filter(item => {
          if (!item.lastUpdated) return true;
          return now - item.lastUpdated <= FIVE_MIN;
        });
      });
    },
    addToLoadedMany: (state, action) => {
      const { type, values } = action.payload;

      const clearableTypes = ['album', 'user', 'artist'];
      const nonClearableTypes = ['region', 'genre', 'language'];

      let targetArray;

      if (clearableTypes.includes(type)) {
        targetArray = state.clearableData[`${type}s`];
      } else if (nonClearableTypes.includes(type)) {
        targetArray = state.nonClearableData[`${type}s`];
      } else {
        return;
      }

      if (!targetArray) return;

      values.forEach(item => {
        const alreadyExists = targetArray.some(existing => {
          if (existing.data && item._id) {
            return existing.data._id === item._id;
          } else if (existing.data.id && item.id) {
            return existing.data.id === item.id;
          }
          return existing._id === item._id;
        });
        if (!alreadyExists) {
          targetArray.push({ data: item, lastUpdated: Date.now() });
        }
      });
    },
  },
});

export const { addToLoadedOne, addToLoadedMany, clearOldData } = loadedSlice.actions;
export default loadedSlice.reducer;
