import axios from 'axios';

export const baseUrl = 'https://conduit.productionready.io/api/';

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

export const userRequest = (token) => {
  const header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const url = `${baseUrl}user`;
  const response = axios.get(url, header);
  return response;
};
