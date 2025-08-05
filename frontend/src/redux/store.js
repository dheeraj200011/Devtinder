import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import feedReducer from "../redux/feedSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
export default store;
