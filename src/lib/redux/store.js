    import { createStore, combineReducers } from 'redux';
import musicSlice from './music/musicState'; 
import resizingReducer from './other/resizer';
import viewSlice from './pages/viewSlice';
import dataSlice from './data/dataSlice';
import albumsReducer from './data/albumSlice';
import loadedSlice from './data/loadedSlice'

const rootReducer = combineReducers({
    music: musicSlice, 
    resizingReducer,
    view: viewSlice,
    data: dataSlice,
    albums: albumsReducer,
    loaded: loadedSlice
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
