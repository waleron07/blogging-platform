import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const loginData = handleActions(
  {
    [actions.loginData](state, { payload: login }) {
      return login.user;
    },
  },
  {},
);

const isLogin = handleActions(
  {
    [actions.setLoginSuccess]() {
      return true;
    },
    [actions.setLoginFailure]() {
      return false;
    },
  },
  false,
);

const isSignUp = handleActions(
  {
    [actions.setSignUpSuccess](state, { payload: status }) {
      return status;
    },
  },
  false,
);

export default combineReducers({
  isSignUp,
  isLogin,
  loginData,
});
