import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import userSlice from "./user-slice"
import educationSlice from "./education-slice"

const store = configureStore({
  reducer: { auth: authSlice, profile: userSlice },
});

export default store;
