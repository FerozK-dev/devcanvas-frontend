import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import userSlice from "./user-slice"
import educationSlice from "./education-slice"
import projectsSlice from "./projects-slice"
import experienceSlice from "./experience-slice"

const store = configureStore({
  reducer: { auth: authSlice, profile: userSlice, educations: educationSlice, projects: projectsSlice, experiences: experienceSlice },
});

export default store;
