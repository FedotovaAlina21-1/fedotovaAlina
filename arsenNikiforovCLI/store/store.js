// store.js
import { createStore } from 'redux';

const initialState = {
  counter: 0,
};

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER',
});

export const decrementCounter = () => ({
  type: 'DECREMENT_COUNTER',
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT_COUNTER':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;