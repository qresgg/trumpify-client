import { createStore, combineReducers } from 'redux';
import musicSlice from './musicState'; 
import resizingReducer from './resizer'

const rootReducer = combineReducers({
    music: musicSlice, 
    resizingReducer
});

export const store = createStore(rootReducer);
