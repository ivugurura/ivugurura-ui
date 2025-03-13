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

// export const pdfsSlice = apiSlice.injectEndpoints({
//   baseQuery: fetchBaseQuery({ baseUrl: '/ ' }),
//   endpoints: (builder) => ({
//     downloadPDFFile: builder.mutation({
//       queryFn: async ({ setupId, name }, api, extraOptions, baseQuery) => {
//         const result = await baseQuery({
//           url: `/setups/${setupId}/file`,
//           responseHandler: (response) => response.blob(),
//         });
//         var hiddenElement = document.createElement('a');
//         var url = window.URL || window.webkitURL;
//         var blobPDF = url.createObjectURL(result.data);
//         hiddenElement.href = blobPDF;
//         hiddenElement.target = '_blank';
//         hiddenElement.download = `${name}_report.pdf`;
//         hiddenElement.click();
//         setTimeout(() => {
//           document.body.removeChild(hiddenElement);
//           url.revokeObjectURL(blobPDF);
//         }, 2000);
//         return { data: null };
//       },
//     }),
//   }),
// });

// export const { useDownloadPDFFileMutation } = pdfsSlice;
