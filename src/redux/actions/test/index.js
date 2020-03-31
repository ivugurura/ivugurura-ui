import { ACTION_TEST } from '../actionTypes';
import { fulfilled } from '../../../utils/actions';

export const testReducerAction = () => dispatch => {
  dispatch({
    type: fulfilled(ACTION_TEST),
    payload: 'It must work'
  });
};
