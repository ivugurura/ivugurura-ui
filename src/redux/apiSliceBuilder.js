import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  generateSignature,
  lStorage,
  systemLanguage,
} from '../helpers/utils/constants';

import * as initialStates from './initialStates';
import { buildAppStates } from './stateBuilder';
import { formulateQuery, startCase } from './utils';

const states = buildAppStates();

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

const formatBaseQuery = () => {
  const { timestamp, hash } = generateSignature();
  return fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1`,
    headers: {
      Authorization: lStorage.token,
      'Accept-Language': systemLanguage,
      'X-Timestamp': timestamp,
      'X-Signature': hash,
    },
  });
};
const buildAppApis = () => {
  const baseQuery = formatBaseQuery();

  return states.map((state) =>
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
};

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

const slicers = buildApiSlicers();

export const { actions, initials, reducers, middlewares } = slicers;
