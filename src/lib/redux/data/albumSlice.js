import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const albumsAdapter = createEntityAdapter({
  selectId: (album) => album._id,
})

const initialState = albumsAdapter.getInitialState();

const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
        albumAdded: albumsAdapter.addOne,
        albumsReceived: albumsAdapter.addMany,
        albumUpdated: albumsAdapter.updateOne,
    },
});

export const {
  albumAdded,
  albumsReceived,
  albumUpdated,
} = albumsSlice.actions

export default albumsSlice.reducer

export const {
  selectById: selectAlbumById,
  selectAll: selectAllAlbums,
} = albumsAdapter.getSelectors((state) => state.albums)