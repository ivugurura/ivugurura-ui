import { filePathSlice } from './constantSlices';

export { actions } from './apiSliceBuilder';
export const { setFilePath, resetFilePath } = filePathSlice.actions;
