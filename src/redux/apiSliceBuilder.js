import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { formulateQuery, startCase } from '../helpers/utils';
import { lStorage, systemLanguage } from '../helpers/utils/constants';

import * as initialStates from './initialStates';
import { buildAppStates } from './stateBuilder';

const states = buildAppStates();

const getFileName = (response) => {
  const contentDisposition = response.headers.get('Content-Disposition');
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    return match ? match[1] : 'downloaded_file';
  }
  return 'downloaded_file';
};
const buildApiEndPoints = (build, state) => {
  const { actions } = state;
  const endpoints = {};
  Object.keys(actions).forEach((key) => {
    const current = actions[key];
    let buildType = 'query';
    if (current.api.verb !== 'GET' || current.api.isMutation) {
      buildType = 'mutation';
    }
    endpoints[current.action] = build[buildType]({
      query: formulateQuery(current.api),
    });
  });
  return endpoints;
};

const baseQuery = fetchBaseQuery({
  // Fill in your own server starting URL here
  baseUrl: `${process.env.REACT_APP_API_URL}/api/v1`,
  headers: {
    Authorization: lStorage.token,
    'Accept-Language': systemLanguage,
  },
});
const buildAppApis = () =>
  states.map((state) =>
    createApi({
      reducerPath: `${startCase(state.entity, false)}Api`,
      baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        // if (result.data?.totalItems) {
        //   return { data: { ...result.data } };
        // }
        return result;
      },
      endpoints: (build) => buildApiEndPoints(build, state),
    }),
  );

const buildApiSlicers = () => {
  const apis = buildAppApis();
  const utils = {
    reducers: {},
    middlewares: [],
    actions: {},
    initials: initialStates,
  };

  apis.forEach((api) => {
    utils.reducers[api.reducerPath] = api.reducer;
    utils.middlewares.push(api.middleware);

    Object.keys(api).forEach((key) => {
      if (
        key.startsWith('use') &&
        !key.includes('Lazy') &&
        key !== 'usePrefetch'
      ) {
        utils.actions[key] = api[key];
      }
    });
  });

  return utils;
};

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: async (args, api, extraOptions) =>
    baseQuery(args, api, extraOptions), // Replace with your API URL
  endpoints: (builder) => ({
    downloadFile: builder.query({
      query: (filePath) => ({
        url: filePath,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return { blob, filename: getFileName(response) };
        },
        cache: 'no-cache',
      }),
    }),
  }),
});

const slicers = buildApiSlicers();
export const { actions, initials, reducers, middlewares } = slicers;
