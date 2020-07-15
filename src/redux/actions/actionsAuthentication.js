import { createAction } from 'redux-actions';
import { loginRequest, signupRequest, userRequest } from '../../api/index';

export const setSignUpRequest = createAction('STATUS_SIGNUP_REQUEST');
export const setSignUpSuccess = createAction('STATUS_SIGNUP_SUCCESS');
export const setSignUpFailure = createAction('STATUS_SIGNUP_FAILURE');

export const setLoginRequest = createAction('STATUS_LOGIN_REQUEST');
export const setLoginSuccess = createAction('STATUS_LOGIN_SUCCESS');
export const setLoginFailure = createAction('STATUS_LOGIN_FAILURE');

export const setUserRequest = createAction('STATUS_USER_REQUEST');
export const setUserSuccess = createAction('STATUS_USER_SUCCESS');
export const setUserFailure = createAction('STATUS_USER_FAILURE');

export const setLoginExit = createAction('LOGIN_EXIT');

export const getUser = () => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const response = await userRequest();
    dispatch(setUserSuccess(response.data));
    return response;
  } catch (error) {
    dispatch(setUserFailure());
    throw error;
  }
};

export const authorization = (values) => async (dispatch) => {
  dispatch(setSignUpRequest());
  try {
    const response = await signupRequest(values);
    dispatch(setSignUpSuccess(response.data));
    return response;
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
      dispatch(setLoginSuccess(response.data));
    }
    return response;
  } catch (error) {
    dispatch(setLoginFailure());
    throw error;
  }
};
