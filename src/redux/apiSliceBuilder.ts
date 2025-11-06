import {
  createApi,
  fetchBaseQuery,
  type Api,
  type BaseQueryFn,
  type EndpointBuilder,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import {
  generateSignature,
  lStorage,
  systemLanguage,
} from '../helpers/utils/constants';

import * as initialStates from './initialStates';
import { buildAppStates } from './stateBuilder';
import { formulateQuery, startCase } from './utils';

interface ServerData<TData> {
  data: TData;
  status: number;
  totalItems?: number;
  error?: string;
  message?: string;
}

// Type definitions for API hooks
export type QueryHook<TData = unknown, TArgs = void> = (
  args: TArgs,
  options?: unknown,
) => {
  data?: ServerData<TData>;
  error?: unknown;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

export type MutationHook<TData = unknown, TArgs = void> = () => [
  (args: TArgs) => { data?: TData; error?: unknown },
  {
    data?: TData;
    error?: unknown;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
  },
];

// Generic hook type that can be either query or mutation
type ApiHook<TData = unknown, TArgs = void> =
  | QueryHook<TData, TArgs>
  | MutationHook<TData, TArgs>;

interface ApiSlicersReturn {
  reducers: Record<string, unknown>;
  middlewares: unknown[];
  actions: Record<string, ApiHook>;
  initials: typeof initialStates;
}

interface DynamicApi
  extends Api<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      object,
      FetchBaseQueryMeta
    >,
    Record<string, unknown>,
    string,
    string
  > {
  reducerPath: string;
  reducer: unknown;
  middleware: unknown;
}

const states = buildAppStates();

const buildApiEndPoints = (build: EndpointBuilder, state: APP.IState) => {
  const { actions } = state;
  const endpoints: Record<string, unknown> = {};
  Object.keys(actions).forEach((key) => {
    const current = actions[key];
    let buildType = 'query';
    if (current.api.verb !== 'GET' || current.api.isMutation) {
      buildType = 'mutation';
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    endpoints[current.action] = build[buildType]({
      query: formulateQuery(current.api),
    });
  });
  return endpoints;
};

const formatBaseQuery = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { timestamp, hash } = generateSignature();
  return fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
      Authorization: lStorage.token,
      'Accept-Language': systemLanguage,
      'X-Timestamp': timestamp,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'X-Signature': hash,
    },
  });
};
const buildAppApis = (): DynamicApi[] => {
  const baseQuery = formatBaseQuery();

  return states.map((state) =>
    createApi({
      reducerPath: `${startCase(state.entity, false)}Api`,
      baseQuery,
      // baseQuery: async (args, api, extraOptions) => {
      //   const result = await baseQuery(args, api, extraOptions);
      //   // if (result.data?.totalItems) {
      //   //   return { data: { ...result.data } };
      //   // }
      //   return result;
      // },
      endpoints: (build) => buildApiEndPoints(build, state),
    }),
  );
};

const buildApiSlicers = (): ApiSlicersReturn => {
  const apis = buildAppApis();
  const utils: ApiSlicersReturn = {
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
        utils.actions[key] = api[key] as ApiHook;
      }
    });
  });

  return utils;
};

const slicers = buildApiSlicers();

export const { actions, initials, reducers, middlewares } = slicers;

// Export type helper for using hooks with generics
export type TypedApiHook<TData = unknown, TArgs = void> = ApiHook<TData, TArgs>;
