/* eslint-disable no-unused-expressions */

import { createAction } from 'redux-actions';
import {
  serverRegistrations,
  serverAutorizations,
  dataAutorization,
} from '../api/index';
import { getHeader } from '../helpers-localstorege';

export const setLoginSuccess = createAction('STATUS_LOGIN_SUCCESS');
export const setLoginRequest = createAction('STATUS_LOGIN_REQUEST');
export const setLoginFailure = createAction('STATUS_LOGIN_FAILURE');

export const loginData = createAction('LOGIN_DATA');

export const setSignUpSuccess = createAction('STATUS_SIGNUP_SUCCESS');
export const setSignUpRequest = createAction('STATUS_SIGNUP_REQUEST');
export const setSignUpFailure = createAction('STATUS_SIGNUP_FAILURE');

export const getAutorizations = (history) => async (dispatch) => {
  try {
    const response = await dataAutorization(getHeader());
    dispatch(setLoginSuccess());
    dispatch(loginData(response.data));
    history.push('/blogging-platform/houme');
  } catch (error) {
    history.push('/blogging-platform/signup');
  }
};

export const setAutorizations = (values, setFieldError, history) => async (
  dispatch,
) => {
  const { email, password } = values;
  const autData = {
    user: {
      email,
      password,
    },
  };

  dispatch(setSignUpRequest());
  try {
    const response = await serverAutorizations(autData);
    const { token } = response.data.user;
    localStorage.setItem('token', `${token}`);
    dispatch(getAutorizations(history));
  } catch (error) {
    error.response.data.errors
      && setFieldError('password', 'Почта или пароль неверны');
    error.response.data.errors
      && setFieldError('email', 'Почта или пароль неверны');
  }
};

export const setRegistrations = (values, setFieldError, history) => async (
  dispatch,
) => {
  const { username, email, password } = values;
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  dispatch(setLoginRequest());
  try {
    const response = await serverRegistrations(regData);
    if (response.status === 200) {
      dispatch(setLoginSuccess(true));
      dispatch(setAutorizations(values, setFieldError, history));
    }
  } catch (error) {
    const {
      username: usernameError,
      email: emailError,
    } = error.response.data.errors;
    usernameError
      && setFieldError(
        'username',
        'Пользователь с таким именем уже зарегистрирован',
      );
    emailError
      && setFieldError('email', 'Пользователь с такой почтой уже зарегистрирован');
  }
};
