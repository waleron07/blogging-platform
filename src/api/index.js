import axios from 'axios';
import { getToken } from '../utils/localStorage';

export const baseUrl = 'https://conduit.productionready.io/api/';

export const instance = axios.create();

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    const userConfig = config;
    userConfig.headers.Authorization = `Token ${getToken()}`;
    return userConfig;
  }
  return config;
});

export const userRequest = () => {
  const url = `${baseUrl}user`;
  const response = instance.get(url);
  return response;
};

export const loginRequest = (values) => {
  const { username, email, password } = values;
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  const url = `${baseUrl}users`;
  const response = axios.post(url, regData);
  return response;
};

export const signupRequest = (values) => {
  const { email, password } = values;
  const autData = {
    user: {
      email,
      password,
    },
  };

  const url = `${baseUrl}users/login`;
  const response = axios.post(url, autData);
  return response;
};

export const articlesRequest = (count) => {
  const url = `${baseUrl}articles?limit=10&offset=${count}`;
  const response = instance.get(url);
  return response;
};

export const articleRequest = (slug) => {
  const url = `${baseUrl}articles/${slug}`;
  const response = instance.get(url);
  return response;
};

export const addArticlesRequest = (values) => {
  const url = `${baseUrl}articles`;
  const response = instance.post(url, values);
  return response;
};

export const userArticlesRequest = (values, count) => {
  const url = `${baseUrl}articles?author=${values}&offset=${count}`;
  const response = instance.get(url);
  return response;
};

export const favoriteArticleRequest = (slug) => {
  const url = `${baseUrl}articles/${slug}/favorite`;
  const response = instance.post(url);
  return response;
};

export const unfavoriteArticleRequest = (slug) => {
  const url = `${baseUrl}articles/${slug}/favorite`;
  const response = instance.delete(url);
  return response;
};

export const editArticleRequest = (values, slug) => {
  const url = `${baseUrl}articles/${slug}`;
  const response = instance.put(url, values);
  return response;
};

export const deleteArticleRequest = (slug) => {
  const url = `${baseUrl}articles/${slug}`;
  const response = instance.delete(url);
  return response;
};
