import { pending, rejected, fulfilled } from '../../utils/actions';
import { SEND_CONTACT_US } from '../actions';

const initialState = {
  loading: false,
  loaded: false,
  message: '',
};
export const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(SEND_CONTACT_US):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(SEND_CONTACT_US):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    case rejected(SEND_CONTACT_US):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};
