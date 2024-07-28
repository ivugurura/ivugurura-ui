/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialFileState = {
  fileName: '',
};

const initialUserState = {
  isAuthenticated: false,
  user: {},
};

export const filePathSlice = createSlice({
  name: 'filer',
  initialState: initialFileState,
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

export const authUserSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});
