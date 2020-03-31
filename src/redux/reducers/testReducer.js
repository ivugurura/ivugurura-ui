import { initialTestState } from '../../helpers';
import { fulfilled } from '../../utils/actions';
import { ACTION_TEST } from '../actions';

export const testReducer = (state = initialTestState, action) => {
  switch (action.type) {
    case fulfilled(ACTION_TEST):
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};
