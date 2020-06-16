import {
  addCommuniqueState,
  getCommuniquesState,
  getPubCommuniquesState,
  publishCommuniqueState,
} from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  ADD_COMMUNIQUE,
  GET_COMMUNIQUES,
  GET_PUBLISHED_COMMUNIQUE,
  PUBLISH_COMMUNIQUE,
} from '../actions/actionTypes';

export const addCommuniqueReducer = (state = addCommuniqueState, action) => {
  switch (action.type) {
    case pending(ADD_COMMUNIQUE):
      return {
        ...state,
        communiqueAdding: true,
        communiqueAdded: false,
      };
    case fulfilled(ADD_COMMUNIQUE):
      return {
        ...state,
        communiqueAdding: false,
        communiqueAdded: true,
        communique: action.payload.data.data,
      };
    case rejected(ADD_COMMUNIQUE):
    default:
      return {
        ...state,
        communiqueAdding: false,
      };
  }
};
export const getCommuniquesReducer = (state = getCommuniquesState, action) => {
  switch (action.type) {
    case pending(GET_COMMUNIQUES):
      return {
        ...state,
        communiquesFetching: true,
      };
    case fulfilled(GET_COMMUNIQUES):
      return {
        ...state,
        communiquesFetching: false,
        communiquesFetched: true,
        communiques: action.payload.data.data,
      };
    case rejected(GET_COMMUNIQUES):
    default:
      return {
        ...state,
        communiquesFetching: false,
      };
  }
};
export const getPubCommuniqueReducer = (
  state = getPubCommuniquesState,
  action
) => {
  switch (action.type) {
    case pending(GET_PUBLISHED_COMMUNIQUE):
      return {
        ...state,
        communiqueFetching: true,
        communiqueFetched: false,
      };
    case fulfilled(GET_PUBLISHED_COMMUNIQUE):
      return {
        ...state,
        communiqueFetching: false,
        communiqueFetched: true,
        communique: action.payload.data.data,
      };
    case rejected(GET_PUBLISHED_COMMUNIQUE):
    default:
      return {
        ...state,
        communiqueFetching: false,
      };
  }
};
export const publishCommuniqueReducer = (
  state = publishCommuniqueState,
  action
) => {
  switch (action.type) {
    case pending(PUBLISH_COMMUNIQUE):
      return {
        ...state,
        publishing: true,
        published: false,
      };
    case fulfilled(PUBLISH_COMMUNIQUE):
      return {
        ...state,
        publishing: false,
        published: true,
      };
    case rejected(PUBLISH_COMMUNIQUE):
    default:
      return {
        ...state,
        publishing: false,
      };
  }
};
