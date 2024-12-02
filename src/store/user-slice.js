import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const fetchUser = createAsyncThunk("fetchUser/profileSlice", async () => {
  try {
    const profile = await canvasApi.get("/api/v1/users/show_profile", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });

    return profile.data;
  } catch (error) {}
});

const editUser = createAsyncThunk(
  "editUser/profileSlice",
  async ({ first_name, last_name,  }, { rejectWithValue }) => {
    try {
      const profile = await canvasApi.patch(
        "/api/v1/users/",
        { first_name, last_name, location, about_me, contact, title, headline, github_url, linked_url, work_email },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );

      return profile.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialProfileState = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  about_me: "", contact: "",
  title: "",
  headline: "",
  github_url: "",
  linked_url: "",
  work_email: "",
  profile_picture: "",
  profileData: {}
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {})
      
      .addCase(editUser.pending, (state) => {})
      .addCase(editUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {});
    }
});

export { fetchUser, editUser };

export default profileSlice.reducer;
