import { createStore, combineReducers } from 'redux';
import musicSlice from './musicState'; 
import resizingReducer from './resizer'
import viewSlice from './viewSlice'
import dataSlice from './dataSlice'

const rootReducer = combineReducers({
    music: musicSlice, 
    resizingReducer,
    view: viewSlice,
    data: dataSlice,
});

export const store = createStore(rootReducer);
