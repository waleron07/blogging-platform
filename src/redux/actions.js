import { createAction } from 'redux-actions';
import { loginRequest, signupRequest, userRequest } from '../api/index';
import { setToken } from '../utils/localStorage';
import { getHome, getSignup } from '../utils/route';

export const setSignUpRequest = createAction('STATUS_SIGNUP_REQUEST');
export const setSignUpSuccess = createAction('STATUS_SIGNUP_SUCCESS');
export const setSignUpFailure = createAction('STATUS_SIGNUP_FAILURE');

export const setLoginRequest = createAction('STATUS_LOGIN_REQUEST');
export const setLoginSuccess = createAction('STATUS_LOGIN_SUCCESS');
export const setLoginFailure = createAction('STATUS_LOGIN_FAILURE');

export const setUserRequest = createAction('STATUS_USER_REQUEST');
export const setUserSuccess = createAction('STATUS_USER_SUCCESS');
export const setUserFailure = createAction('STATUS_USER_FAILURE');

export const loginData = createAction('LOGIN_DATA');
export const setLoginExit = createAction('LOGIN_EXIT');
export const getRequest = createAction('REQUEST_DATA');

export const getUser = (history) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const response = await userRequest();
    dispatch(setUserSuccess());
    dispatch(loginData(response.data));
    history.push(getHome());
  } catch (error) {
    dispatch(setUserFailure());
    history.push(getSignup());
  }
};

export const authorization = (values) => async (dispatch) => {
  dispatch(setSignUpRequest());
  try {
    const response = await signupRequest(values);
    const { token } = response.data.user;
    setToken(token);
    dispatch(setSignUpSuccess());
  } catch (error) {
    dispatch(setSignUpFailure());
    throw error;
  }
};

export const registration = (values) => async (dispatch) => {
  dispatch(setLoginRequest());
  try {
    const response = await loginRequest(values);
    if (response.status === 200) {
      const { token } = response.data.user;
      localStorage.setItem('token', `${token}`);
      dispatch(setLoginSuccess());
    }
  } catch (error) {
    dispatch(setLoginFailure());
    throw error;
  }
};
