const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUrl = `${BASE_URL}/auth/login`;
export const signupUrl = `${BASE_URL}/auth/signup`;
export const logoutUrl = `${BASE_URL}/auth/logout`;
export const getprofile = `${BASE_URL}/profile/getuserprofile`;
export const getFeeds = `${BASE_URL}/user/feed`;
export const editProfileUrl = `${BASE_URL}/profile/editprofile`;
export const getAllConnectionUrl = `${BASE_URL}/user/connections`;
export const getAllRequsetUrl = `${BASE_URL}/user/requests`;
export const sendConnectionRequest = `${BASE_URL}/request/send`;
export const reviewConnectionRequest = `${BASE_URL}/request/review/:status/:requestId`;
