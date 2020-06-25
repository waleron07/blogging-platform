export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const clearLocalstoge = () => {
  localStorage.clear();
};

export const setToken = (token) => {
  localStorage.setItem('token', `${token}`);
};
