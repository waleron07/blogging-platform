export const getBlogging = () => '/blogging-platform';

export const getLogin = () => '/blogging-platform/login';

export const getSignup = () => '/blogging-platform/signup';

export const getAdd = () => '/blogging-platform/add';

export const getHome = () => '/blogging-platform/home';

export const getSlug = (slug) => `/blogging-platform/articles/:${slug}`;

export const getEdit = (slug) => `/blogging-platform/articles/:${slug}/edit`;
