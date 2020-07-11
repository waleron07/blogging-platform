import { createAction } from 'redux-actions';
import {
  loginRequest,
  signupRequest,
  userRequest,
  articlesRequest,
  addArticlesRequest,
  userArticlesRequest,
  articleRequest,
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  editArticleRequest,
  deleteArticleRequest,
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

export const setArticlesRequest = createAction('STATUS_ARTICLES_REQUEST');
export const setArticlesSuccess = createAction('STATUS_ARTICLES_SUCCESS');
export const setArticlesFailure = createAction('STATUS_ARTICLES_FAILURE');

export const setArticleRequest = createAction('STATUS_ARTICLE_REQUEST');
export const setArticleSuccess = createAction('STATUS_ARTICLE_SUCCESS');
export const setArticleFailure = createAction('STATUS_ARTICLE_FAILURE');

export const setCreateArticleRequest = createAction(
  'STATUS_CREATE_ARTICLE_REQUEST',
);
export const setCreateArticleSuccess = createAction(
  'STATUS_CREATE_ARTICLE_SUCCESS',
);
export const setCreateArticleFailure = createAction(
  'STATUS_CREATE_ARTICLE_FAILURE',
);

export const setUserArticleRequest = createAction(
  'STATUS_USER_ARTICLE_REQUEST',
);
export const setUserArticleSuccess = createAction(
  'STATUS_USER_ARTICLE_SUCCESS',
);
export const setUserArticleFailure = createAction(
  'STATUS_USER_ARTICLE_FAILURE',
);

export const setDeleteArticleRequest = createAction(
  'STATUS_DELETE_ARTICLE_REQUEST',
);
export const setDeleteArticleSuccess = createAction(
  'STATUS_DELETE_ARTICLE_SUCCESS',
);
export const setDeleteArticleFailure = createAction(
  'STATUS_DELETE_ARTICLE_FAILURE',
);

export const setEditArticleRequest = createAction(
  'STATUS_EDIT_ARTICLE_REQUEST',
);
export const setEditArticleSuccess = createAction(
  'STATUS_EDIT_ARTICLE_SUCCESS',
);
export const setEditArticleFailure = createAction(
  'STATUS_EDIT_ARTICLE_FAILURE',
);

export const setFavoriteArticleRequest = createAction(
  'STATUS_FAVORITE_ARTICLE_REQUEST',
);
export const setFavoriteArticleSuccess = createAction(
  'STATUS_FAVORITE_ARTICLE_SUCCESS',
);
export const setFavoriteArticleFailure = createAction(
  'STATUS_FAVORITE_ARTICLE_FAILURE',
);

export const setLoginExit = createAction('LOGIN_EXIT');

export const getUser = (history) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const response = await userRequest();
    dispatch(setUserSuccess(response.data));
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

export const getArticles = (count = 0) => async (dispatch) => {
  dispatch(setArticlesRequest);
  try {
    const response = await articlesRequest(count);
    dispatch(setArticlesSuccess(response.data));
  } catch (error) {
    dispatch(setArticlesFailure(error.isAxiosError));
    throw error;
  }
};

export const getArticle = (slug, history = null) => async (dispatch) => {
  dispatch(setArticleRequest);
  try {
    const response = await articleRequest(slug);
    dispatch(setArticleSuccess(response.data));
    if (history !== null) {
      history.push(getSlug(slug));
    }
  } catch (error) {
    dispatch(setArticleFailure());
    throw error;
  }
};

export const createArticles = (values) => async (dispatch) => {
  dispatch(setCreateArticleRequest());
  try {
    await addArticlesRequest(values);
    dispatch(setCreateArticleSuccess());
  } catch (error) {
    dispatch(setCreateArticleFailure(error.isAxiosError));
    throw error;
  }
};

export const userArticles = (values, count = 0) => async (dispatch) => {
  dispatch(setUserArticleRequest());
  try {
    const response = await userArticlesRequest(values, count);
    dispatch(setUserArticleSuccess(response.data));
  } catch (error) {
    dispatch(setUserArticleFailure(error.isAxiosError));
    throw error;
  }
};

export const deleteArticle = (slug) => async (dispatch) => {
  dispatch(setDeleteArticleRequest());
  try {
    await deleteArticleRequest(slug);
    dispatch(setDeleteArticleSuccess());
  } catch (error) {
    dispatch(setDeleteArticleFailure(error.isAxiosError));
    throw error;
  }
};

export const editArticle = (values, slug) => async (dispatch) => {
  dispatch(setEditArticleRequest());
  try {
    await editArticleRequest(values, slug);
    dispatch(setEditArticleSuccess());
  } catch (error) {
    dispatch(setEditArticleFailure());
    throw error;
  }
};

export const favoriteArticle = (slug) => async (dispatch) => {
  dispatch(setFavoriteArticleRequest());
  try {
    const response = await favoriteArticleRequest(slug);
    dispatch(setFavoriteArticleSuccess(response.data));
  } catch (error) {
    dispatch(setFavoriteArticleFailure(error.isAxiosError));
  }
};

export const unfavoriteArticle = (slug) => async (dispatch) => {
  dispatch(setFavoriteArticleRequest());
  try {
    const response = await unfavoriteArticleRequest(slug);
    dispatch(setFavoriteArticleSuccess(response.data));
  } catch (error) {
    dispatch(setFavoriteArticleFailure(error.isAxiosError));
  }
};
