import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";
window.canvasApi = canvasApi;

const initialAuthState = {
  isAuthenticated: false,
  authToken: "",
  loading: false,
  error: null,
};

// Async thunk for login
const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = await canvasApi.post("/api/v1/session/", { email, password });
      return auth.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for signup
const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password, first_name, last_name, password_confirmation },
    { rejectWithValue }
  ) => {
    try {
      const register = await canvasApi.post("/api/v1/session/signup", {
        email,
        password,
        first_name,
        last_name,
        password_confirmation,
      });
      return register.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Set loading to true when the login request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        // Handle the success case for login
        state.loading = false;
        state.isAuthenticated = true;
        state.authToken = action.payload.auth_token;
        localStorage.setItem("is_logged_in", true);
        localStorage.setItem("auth_token", JSON.stringify(action.payload.auth_token));
      })
      .addCase(login.rejected, (state, action) => {
        // Handle the error case for login
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      
      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true; // Set loading to true when the signup request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(signup.fulfilled, (state, action) => {
        // Handle the success case for signup
        state.loading = false;
        state.isAuthenticated = true;
        state.authToken = action.payload.auth_token;
        localStorage.setItem("is_logged_in", true);
        localStorage.setItem("auth_token", JSON.stringify(action.payload.auth_token));
      })
      .addCase(signup.rejected, (state, action) => {
        // Handle the error case for signup
        state.loading = false;
        state.error = action.payload || "Failed to signup";
      });
  },
});

export const authActions = authSlice.actions;

export { login, signup };

export default authSlice.reducer;