import { createSlice } from '@reduxjs/toolkit';

const initialFileState: ST.IFile = {
  fileName: '',
};

const initialUserState: ST.IAuth = {
  isAuthenticated: false,
  user: {} as APP.IUser,
};

interface IStateAction<T> {
  type: string;
  payload: T;
}

export const filePathSlice = createSlice({
  name: 'filer',
  initialState: initialFileState,
  reducers: {
    setFilePath: (state, action: IStateAction<string>) => {
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

export const authUserSlice = createSlice<ST.IAuth>({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: IStateAction<APP.IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});
