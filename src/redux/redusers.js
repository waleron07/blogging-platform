import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const username = handleActions(
  {
    [actions.loginData](state, { payload: login }) {
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

const isBlockingForm = handleActions(
  {
    [actions.setLoginRequest]() {
      return true;
    },
    [actions.setCreateArticleRequest]() {
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
    [actions.setLoginFailure]() {
      return false;
    },
    [actions.setCreateArticleFailure]() {
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
    [actions.articlesData](state, { payload: articles }) {
      return articles;
    },
  },
  [],
);

const articleOne = handleActions(
  {
    [actions.articleData](state, { payload: article }) {
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
});
