import { createAction } from 'redux-actions';

import {
  articlesRequest,
  addArticlesRequest,
  userArticlesRequest,
  articleRequest,
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  editArticleRequest,
  deleteArticleRequest,
} from '../../api/index';

import { getSlug } from '../../utils/route';

export const setArticlesListRequest = createAction(
  'STATUS_ARTICLES_LIST_REQUEST',
);
export const setArticlesListSuccess = createAction(
  'STATUS_ARTICLES_LIST_SUCCESS',
);
export const setArticlesListFailure = createAction(
  'STATUS_ARTICLES_LIST_FAILURE',
);

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
export const getArticles = (count = 0) => async (dispatch) => {
  dispatch(setArticlesListRequest);
  try {
    const response = await articlesRequest(count);
    dispatch(setArticlesListSuccess(response.data));
  } catch (error) {
    dispatch(setArticlesListFailure());
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
    dispatch(setCreateArticleFailure());
    throw error;
  }
};

export const userArticles = (values, count = 0) => async (dispatch) => {
  dispatch(setUserArticleRequest());
  try {
    const response = await userArticlesRequest(values, count);
    dispatch(setUserArticleSuccess(response.data));
  } catch (error) {
    dispatch(setUserArticleFailure());
    throw error;
  }
};

export const deleteArticle = (slug) => async (dispatch) => {
  dispatch(setDeleteArticleRequest());
  try {
    await deleteArticleRequest(slug);
    dispatch(setDeleteArticleSuccess());
  } catch (error) {
    dispatch(setDeleteArticleFailure());
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
    dispatch(setFavoriteArticleFailure());
  }
};

export const unfavoriteArticle = (slug) => async (dispatch) => {
  dispatch(setFavoriteArticleRequest());
  try {
    const response = await unfavoriteArticleRequest(slug);
    dispatch(setFavoriteArticleSuccess(response.data));
  } catch (error) {
    dispatch(setFavoriteArticleFailure());
  }
};
