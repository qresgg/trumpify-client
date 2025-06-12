import { createStore, combineReducers } from 'redux';
import musicSlice from './music/musicState'; 
import resizingReducer from './other/resizer'
import viewSlice from './pages/viewSlice'
import dataSlice from './data/dataSlice'

const rootReducer = combineReducers({
    music: musicSlice, 
    resizingReducer,
    view: viewSlice,
    data: dataSlice,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
