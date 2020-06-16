export const getHeader = () => {
  const token = localStorage.getItem('token');
  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  }
  return header;
};

export const clearLocalstoge = () => {
  localStorage.clear();
};

export const getAurorisation = () => {
  const header = getHeader();
  return header === null ? 'noutAutorization' : 'autorization';
};
