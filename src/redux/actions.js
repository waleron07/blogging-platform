import { createAction } from 'redux-actions';
import { loginRequest, signupRequest, userRequest } from '../api/index';
import { getToken } from '../utils';

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
    const response = await userRequest(getToken());
    dispatch(setUserSuccess());
    dispatch(loginData(response.data));
    history.push('/blogging-platform/houme');
  } catch (error) {
    dispatch(setUserFailure());
    history.push('/blogging-platform/signup');
  }
};

export const authorization = (values, setFieldError) => async (dispatch) => {
  dispatch(setSignUpRequest());
  try {
    const response = await signupRequest(values);
    dispatch(setSignUpSuccess());
    const { token } = response.data.user;
    localStorage.setItem('token', `${token}`);
  } catch (error) {
    dispatch(setSignUpFailure());
    if (error.response === undefined && error.isAxiosError) {
      setFieldError('errorName', 'Нет подключения к интернету');
    } else {
      setFieldError('password', 'Почта или пароль неверны');
      setFieldError('email', 'Почта или пароль неверны');
    }
  }
};

export const registration = (values, setFieldError) => async (dispatch) => {
  dispatch(setLoginRequest());
  try {
    const response = await loginRequest(values);
    if (response.status === 200) {
      dispatch(setLoginSuccess());
      const { token } = response.data.user;
      localStorage.setItem('token', `${token}`);
    }
  } catch (error) {
    dispatch(setLoginFailure());
    if (error.response === undefined && error.isAxiosError) {
      setFieldError('errorName', 'Нет подключения к интернету');
    } else {
      setFieldError(
        'username',
        'Пользователь с таким именем уже зарегистрирован',
      );
      setFieldError('email', 'Пользователь с такой почтой уже зарегистрирован');
    }
  }
};
