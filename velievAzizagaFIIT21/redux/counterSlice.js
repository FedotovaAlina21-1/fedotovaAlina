import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    double: (state) => {
      state.value *= 2;
    },
  },
});

export const { increment, reset, double } = counterSlice.actions;

export default counterSlice.reducer;
