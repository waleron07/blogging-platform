import { createAction } from 'redux-actions';
import {
  loginRequest,
  signupRequest,
  userRequest,
  articlesRequest,
  addArticlesRequest,
  userArticlesRequest,
  articleRequest,
} from '../api/index';
import { setToken } from '../utils/localStorage';
import { getBlogging, getSignup, getSlug } from '../utils/route';

export const setSignUpRequest = createAction('STATUS_SIGNUP_REQUEST');
export const setSignUpSuccess = createAction('STATUS_SIGNUP_SUCCESS');
export const setSignUpFailure = createAction('STATUS_SIGNUP_FAILURE');

export const setLoginRequest = createAction('STATUS_LOGIN_REQUEST');
export const setLoginSuccess = createAction('STATUS_LOGIN_SUCCESS');
export const setLoginFailure = createAction('STATUS_LOGIN_FAILURE');

export const setUserRequest = createAction('STATUS_USER_REQUEST');
export const setUserSuccess = createAction('STATUS_USER_SUCCESS');
export const setUserFailure = createAction('STATUS_USER_FAILURE');

export const setCreateArticleRequest = createAction(
  'STATUS_CREATE_ARTICLE_REQUEST',
);
export const setCreateArticleSuccess = createAction(
  'STATUS_CREATE_ARTICLE_SUCCESS',
);
export const setCreateArticleFailure = createAction(
  'STATUS_CREATE_ARTICLE_FAILURE',
);

export const loginData = createAction('LOGIN_DATA');
export const setLoginExit = createAction('LOGIN_EXIT');
export const getRequest = createAction('REQUEST_DATA');
export const articlesData = createAction('ARTICLES_DATA');
export const articleData = createAction('ARTICLE_DATA');

export const getUser = (history) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const response = await userRequest();
    dispatch(setUserSuccess());
    dispatch(loginData(response.data));
    history.push(getBlogging());
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

export const getArticles = () => async (dispatch) => {
  try {
    const response = await articlesRequest();
    dispatch(articlesData(response.data));
  } catch (error) {
    dispatch(setLoginFailure());
    throw error;
  }
};

export const getArticle = (history, slug) => async (dispatch) => {
  try {
    const response = await articleRequest(slug);
    dispatch(articleData(response.data));
    history.push(getSlug(slug));
  } catch (error) {
    dispatch(setLoginFailure());
    throw error;
  }
};

export const createArticles = (values) => async (dispatch) => {
  dispatch(setCreateArticleRequest());
  try {
    await addArticlesRequest(values);
    dispatch(setCreateArticleSuccess());
  } catch (error) {
    dispatch(setCreateArticleFailure());
    throw error;
  }
};

export const userArticles = (values) => async (dispatch) => {
  try {
    const response = await userArticlesRequest(values);
    dispatch(articlesData(response.data));
  } catch (error) {
    dispatch(setLoginFailure());
    throw error;
  }
};
