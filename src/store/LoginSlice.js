import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Initial state: Check if "auth-token" exists in cookies to determine if logged in
const initialState = { loggedIn: cookies.get("auth-token") ? true : false };
console.log(cookies.get("auth-token"));
// Async thunk for signing out
export const handleSignOut = createAsyncThunk(
  'auth/handleSignOut',
  async (_, thunkAPI) => {
    try {
      await signOut(auth); // Perform Firebase sign-out
      cookies.remove("auth-token"); // Remove the token from cookies
    } catch (err) {
      console.error("Failed to sign out", err);
      return thunkAPI.rejectWithValue(err.message); // Return error if sign-out fails
    }
  }
);

const LoginSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
      console.log(state.loggedIn) // Set the login state directly from the action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignOut.fulfilled, (state) => {
        state.loggedIn = false; // Update state after successful sign-out
      })
      .addCase(handleSignOut.rejected, (state, action) => {
        console.error("Sign-out failed:", action.payload); // Optionally handle the error in state
      })
      .addCase(handleSignOut.pending, () => {
        // Optional: Set a loading state or handle any pre-sign-out logic
        console.log("Signing out...");
      });
  },
});

const store = configureStore({
  reducer: {
    auth: LoginSlice.reducer, // This will add the LoginSlice.reducer under the 'auth' key
  },
});

export const { setLoggedIn } = LoginSlice.actions;
export default store;
