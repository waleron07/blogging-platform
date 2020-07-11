/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const username = handleActions(
  {
    [actions.setUserSuccess](state, { payload: login }) {
      return login.user.username;
    },
  },
  '',
);

const isAuth = handleActions(
  {
    [actions.setLoginSuccess]() {
      return true;
    },
    [actions.setSignUpSuccess]() {
      return true;
    },
    [actions.setUserSuccess]() {
      return true;
    },
    [actions.setLoginFailure]() {
      return false;
    },
    [actions.setSignUpFailure]() {
      return false;
    },
    [actions.setUserFailure]() {
      return false;
    },
    [actions.setLoginExit]() {
      return false;
    },
  },
  false,
);

const isErrorInternet = handleActions(
  {
    [actions.setFavoriteArticleFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actions.setFavoriteArticleSuccess]() {
      return false;
    },
    [actions.setCreateArticleFailure]() {
      return false;
    },
    [actions.setDeleteArticleFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actions.setDeleteArticleSuccess]() {
      return false;
    },
    [actions.setUserArticleFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actions.setUserArticleSuccess]() {
      return false;
    },
    [actions.setCreateArticleSuccess]() {
      return false;
    },
    [actions.setArticlesFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actions.setArticlesSuccess]() {
      return false;
    },
  },
  false,
);

const isBlockingForm = handleActions(
  {
    [actions.setLoginRequest]() {
      return true;
    },
    [actions.setCreateArticleRequest]() {
      return true;
    },
    [actions.setDeleteArticleRequest]() {
      return true;
    },
    [actions.setEditArticleRequest]() {
      return true;
    },
    [actions.setFavoriteArticleRequest]() {
      return true;
    },
    [actions.setSignUpRequest]() {
      return true;
    },
    [actions.setUserSuccess]() {
      return false;
    },
    [actions.setCreateArticleSuccess]() {
      return false;
    },
    [actions.setDeleteArticleSuccess]() {
      return false;
    },
    [actions.setEditArticleSuccess]() {
      return false;
    },
    [actions.setFavoriteArticleSuccess]() {
      return false;
    },
    [actions.setLoginFailure]() {
      return false;
    },
    [actions.setCreateArticleFailure]() {
      return false;
    },
    [actions.setDeleteArticleFailure]() {
      return false;
    },
    [actions.setEditArticleFailure]() {
      return false;
    },
    [actions.setFavoriteArticleFailure]() {
      return false;
    },
    [actions.setSignUpFailure]() {
      return false;
    },
    [actions.setUserFailure]() {
      return false;
    },
  },
  false,
);

const articlesList = handleActions(
  {
    [actions.setArticlesSuccess](state, { payload: articles }) {
      return articles;
    },
    [actions.setUserArticleSuccess](state, { payload: articles }) {
      const userArticle = true;
      return { ...articles, userArticle };
    },
    [actions.setFavoriteArticleSuccess](state, { payload: { article } }) {
      const { slug, favorited, favoritesCount } = article;
      const { articles, articlesCount } = state;
      articles.forEach((item) => {
        if (slug === item.slug) {
          item.favorited = favorited;
          item.favoritesCount = favoritesCount;
        }
      });
      return { articles, articlesCount };
    },
  },
  [],
);

const articleOne = handleActions(
  {
    [actions.setArticleSuccess](state, { payload: article }) {
      return article;
    },
    [actions.setFavoriteArticleSuccess](state, { payload: article }) {
      return article;
    },
  },
  [],
);

export default combineReducers({
  articlesList,
  articleOne,
  isAuth,
  username,
  isBlockingForm,
  isErrorInternet,
});
