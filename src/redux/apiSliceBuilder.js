import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { formatParamaterizedUrl, startCase } from '../helpers/utils';

import { buildAppStates } from './stateBuilder';

const states = buildAppStates();

const baseQueryOptions = {
  // Fill in your own server starting URL here
  baseUrl: 'https://reformationvoice.org/api/v1',
};

const buildApiEndPoints = (build, state) => {
  const { actions } = state;
  const endpoints = {};
  Object.keys(actions).forEach((key) => {
    const current = actions[key];
    let buildType = 'query';
    if (current.api.verb === 'POST' || current.api.verb === 'PATCH') {
      buildType = 'mutation';
    }
    endpoints[current.action] = build[buildType]({
      query: (args) => {
        console.log({ args });
        return {
          url: formatParamaterizedUrl(current.api.endpoint, args),
          method: current.api.verb,
          body: current.api.hasBody && args,
        };
      },
    });
  });
  return endpoints;
};

const buildAppApis = () => states.map((state) => createApi({
  reducerPath: `${startCase(state.entity, false)}Api`,
  baseQuery: fetchBaseQuery(baseQueryOptions),
  endpoints: (build) => buildApiEndPoints(build, state),
}));

const buildApiSlicers = () => {
  const apis = buildAppApis();
  const utils = { reducers: {}, middlewares: [], actions: {} };

  apis.forEach((api) => {
    utils.reducers[api.reducerPath] = api.reducer;
    utils.middlewares.push(api.middleware);

    Object.keys(api).forEach((key) => {
      if (key.startsWith('use') && !key.includes('Lazy') && key !== 'usePrefetch') {
        utils.actions[key] = api[key];
      }
    });
  });

  return utils;
};

const slicers = buildApiSlicers();
export const { actions, reducers, middlewares } = slicers;
