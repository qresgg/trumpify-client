import { createStore, combineReducers } from 'redux';
import musicSlice from './musicState'; 
import resizingReducer from './resizer'
import viewSlice from './viewSlice'
import userSlice from './userSlice'

const rootReducer = combineReducers({
    music: musicSlice, 
    resizingReducer,
    view: viewSlice,
    user: userSlice,
});

export const store = createStore(rootReducer);
