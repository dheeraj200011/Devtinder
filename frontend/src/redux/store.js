import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import feedReducer from "../redux/feedSlice.js";
import connectionReducer from "../redux/connectionSlice.js";
import requestReducer from "../redux/requestSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default store;
