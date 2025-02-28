import { createStore } from 'redux';

const initialState = {
  isResizing: false,
};

export const setResizing = (payload) => ({
    type: 'SET_RESIZING',
    payload,
  });

const resizingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RESIZING':
      return { ...state, isResizing: action.payload };
    default:
      return state;
  }
};

export const store = createStore(resizingReducer);
