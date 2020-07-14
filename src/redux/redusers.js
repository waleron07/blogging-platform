/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actionsAuthentication from './actions/actionsAuthentication';
import * as actionsArticles from './actions/actionsArticles';

const username = handleActions(
  {
    [actionsAuthentication.setUserSuccess](state, { payload: login }) {
      return login.user.username;
    },
  },
  '',
);

const isAuth = handleActions(
  {
    [actionsAuthentication.setLoginSuccess]() {
      return true;
    },
    [actionsAuthentication.setSignUpSuccess]() {
      return true;
    },
    [actionsAuthentication.setUserSuccess]() {
      return true;
    },
    [actionsAuthentication.setLoginFailure]() {
      return false;
    },
    [actionsAuthentication.setSignUpFailure]() {
      return false;
    },
    [actionsAuthentication.setUserFailure]() {
      return false;
    },
    [actionsAuthentication.setLoginExit]() {
      return false;
    },
  },
  false,
);

const isErrorInternet = handleActions(
  {
    [actionsArticles.setFavoriteArticleFailure](
      state,
      { payload: isAxiosError },
    ) {
      return isAxiosError;
    },
    [actionsArticles.setFavoriteArticleSuccess]() {
      return false;
    },
    [actionsArticles.setCreateArticleFailure]() {
      return false;
    },
    [actionsArticles.setDeleteArticleFailure](
      state,
      { payload: isAxiosError },
    ) {
      return isAxiosError;
    },
    [actionsArticles.setDeleteArticleSuccess]() {
      return false;
    },
    [actionsArticles.setUserArticleFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actionsArticles.setUserArticleSuccess]() {
      return false;
    },
    [actionsArticles.setCreateArticleSuccess]() {
      return false;
    },
    [actionsArticles.setArticlesFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actionsArticles.setArticleFailure](state, { payload: isAxiosError }) {
      return isAxiosError;
    },
    [actionsArticles.setArticlesSuccess]() {
      return false;
    },
    [actionsArticles.setArticleSuccess]() {
      return false;
    },
  },
  false,
);

const isBlockingForm = handleActions(
  {
    [actionsAuthentication.setLoginRequest]() {
      return true;
    },
    [actionsArticles.setCreateArticleRequest]() {
      return true;
    },
    [actionsArticles.setDeleteArticleRequest]() {
      return true;
    },
    [actionsArticles.setEditArticleRequest]() {
      return true;
    },
    [actionsArticles.setFavoriteArticleRequest]() {
      return true;
    },
    [actionsAuthentication.setSignUpRequest]() {
      return true;
    },
    [actionsAuthentication.setUserSuccess]() {
      return false;
    },
    [actionsArticles.setCreateArticleSuccess]() {
      return false;
    },
    [actionsArticles.setDeleteArticleSuccess]() {
      return false;
    },
    [actionsAuthentication.setLoginExit]() {
      return false;
    },
    [actionsArticles.setEditArticleSuccess]() {
      return false;
    },
    [actionsArticles.setFavoriteArticleSuccess]() {
      return false;
    },
    [actionsAuthentication.setLoginFailure]() {
      return false;
    },
    [actionsArticles.setCreateArticleFailure]() {
      return false;
    },
    [actionsArticles.setDeleteArticleFailure]() {
      return false;
    },
    [actionsArticles.setEditArticleFailure]() {
      return false;
    },
    [actionsArticles.setFavoriteArticleFailure]() {
      return false;
    },
    [actionsAuthentication.setSignUpFailure]() {
      return false;
    },
    [actionsAuthentication.setUserFailure]() {
      return false;
    },
  },
  false,
);

const articlesList = handleActions(
  {
    [actionsArticles.setArticlesSuccess](state, { payload: articles }) {
      return articles;
    },
    [actionsArticles.setUserArticleSuccess](state, { payload: articles }) {
      const userArticle = true;
      return { ...articles, userArticle };
    },
    [actionsArticles.setFavoriteArticleSuccess](
      state,
      { payload: { article } },
    ) {
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
    [actionsArticles.setArticleSuccess](state, { payload: article }) {
      return article;
    },
    [actionsArticles.setFavoriteArticleSuccess](state, { payload: article }) {
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
