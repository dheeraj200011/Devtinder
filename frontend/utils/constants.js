// constants.js
const BASE_URL = "http://54.242.172.199/api";

export const loginUrl = `${BASE_URL}/api/v1/auth/login`;
export const signupUrl = `${BASE_URL}/api/v1/auth/signup`;
export const logoutUrl = `${BASE_URL}/api/v1/auth/logout`;
export const getprofile = `${BASE_URL}/api/v1/profile/getuserprofile`;
export const getFeeds = `${BASE_URL}/api/v1/user/feed`;
export const editProfileUrl = `${BASE_URL}/api/v1/profile/editprofile`;
export const getAllConnectionUrl = `${BASE_URL}/api/v1/user/connections`;
export const getAllRequsetUrl = `${BASE_URL}/api/v1/user/requests`;
export const sendConnectionRequest = `${BASE_URL}/api/v1/request/send`;
export const reviewConnectionRequest = `${BASE_URL}/api/v1/request/review/:status/:requestId`;
