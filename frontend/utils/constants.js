const BASE_URL = "https://dashdevs.agency/api/api/v1";
prod;
//const BASE_URL = "http://localhost:3000/api/v1"; // dev

export const loginUrl = `${BASE_URL}/auth/login`;
export const signupUrl = `${BASE_URL}/auth/signup`;
export const logoutUrl = `${BASE_URL}/auth/logout`;
export const getprofile = `${BASE_URL}/profile/getuserprofile`;
export const getFeeds = `${BASE_URL}/user/feed`;
export const editProfileUrl = `${BASE_URL}/profile/editprofile`;
export const getAllConnectionUrl = `${BASE_URL}/user/connections`;
export const getAllRequsetUrl = `${BASE_URL}/user/requests`;
export const sendConnectionRequest = `${BASE_URL}/request/send`;
export const reviewConnectionRequest = `${BASE_URL}/request/review/`;
export const getChatMessages = `${BASE_URL}/chat/getChat/`;
