import { filePathSlice, authUserSlice } from './constantSlices';

export { actions } from './apiSliceBuilder';
export const { setFilePath, resetFilePath } = filePathSlice.actions;
export const { setUser, resetUser } = authUserSlice.actions;
