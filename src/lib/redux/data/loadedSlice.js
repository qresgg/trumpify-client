// LEGACY
// import { createSlice } from "@reduxjs/toolkit";
//
// const initialState = {
//       ephemeralData: {
//             albums: [],
//             users: [],
//             artists: [],
//             likedDuringSession: {
//                 songs: [],
//                 albums: []
//             }
//       },
//       persistentData: {
//             regions: [],
//             genres: [],
//             languages: []
//       }
// };
//
// const loadedSlice = createSlice({
//   name: "loaded",
//   initialState,
//   reducers: {
//     addToLoadedOne: (state, action) => {
//       const { type, value } = action.payload;
//
//       const clearableTypes = ['album', 'user', 'artist'];
//       const nonClearableTypes = ['region', 'genre', 'language'];
//
//       let targetArray;
//
//       if (clearableTypes.includes(type)) {
//         targetArray = state.ephemeralData[`${type}s`];
//       } else if (nonClearableTypes.includes(type)) {
//         targetArray = state.persistentData[`${type}s`];
//       } else {
//         return;
//       }
//
//       if (!targetArray) return;
//       const alreadyExists = targetArray.some(item => {
//         if (item.data && value._id) {
//           return item.data._id === value._id;
//         }
//         return item._id === value._id;
//       });
//
//       if (!alreadyExists) {
//         targetArray.push({ data: value, lastUpdated: Date.now() });
//       }
//     },
//     clearOldData: (state) => {
//           const FIVE_MIN = 15 * 1000;
//           const now = Date.now();
//
//         ['albums', 'users', 'artists'].forEach(key => {
//             state.ephemeralData[key] = state.ephemeralData[key].filter(item => {
//                 if (!item.lastUpdated) return true;
//                 return now - item.lastUpdated <= FIVE_MIN;
//             });
//         });
//         state.ephemeralData.likedDuringSession = {
//             songs: [],
//             albums: []
//         };
//     },
//     addToLoadedMany: (state, action) => {
//       const { type, values } = action.payload;
//
//       const clearableTypes = ['album', 'user', 'artist'];
//       const nonClearableTypes = ['region', 'genre', 'language'];
//
//       let targetArray;
//
//       if (clearableTypes.includes(type)) {
//         targetArray = state.ephemeralData[`${type}s`];
//       } else if (nonClearableTypes.includes(type)) {
//         targetArray = state.persistentData[`${type}s`];
//       } else {
//         return;
//       }
//
//       if (!targetArray) return;
//
//       values.forEach(item => {
//         const alreadyExists = targetArray.some(existing => {
//           if (existing.data && item._id) {
//             return existing.data._id === item._id;
//           } else if (existing.data.id && item.id) {
//             return existing.data.id === item.id;
//           }
//           return existing._id === item._id;
//         });
//         if (!alreadyExists) {
//           targetArray.push({ data: item, lastUpdated: Date.now() });
//         }
//       });
//     },
//
//       // liked
//       toggleSongLike(state, action) {
//           // action.payload = { songId: "s1", like: true/false }
//           const { songId, like } = action.payload;
//           if (!state.ephemeralData.albums) return;
//
//           state.ephemeralData?.albums.forEach(album => {
//               if (!album.data.songs) return;
//
//               album.data.songs.forEach(song => {
//                   if (song.id === songId) {
//                       song.is_liked = like;
//                   }
//               });
//           });
//       },
//       unLikeDuringSession: (state, action) => {
//         const { type, value } = action.payload;
//         state.ephemeralData.likedDuringSession.songs.pull(value);
//       }
//   },
// });
//
// export const {
//     addToLoadedOne,
//     addToLoadedMany,
//     clearOldData,
//     toggleSongLike,
//     unLikeDuringSession,
// } = loadedSlice.actions;
// export default loadedSlice.reducer;
