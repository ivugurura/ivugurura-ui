/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileName: '',
};

export const filePathSlice = createSlice({
  name: 'filer',
  initialState,
  reducers: {
    setFilePath: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.fileName = action.payload;
    },
    resetFilePath: (state) => {
      state.fileName = '';
    },
  },
});
