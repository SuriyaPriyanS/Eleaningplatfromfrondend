import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: null,
};

// Attempt to load the token from localStorage safely
const storedToken = localStorage.getItem("token");
if (storedToken) {
  try {
    initialState.token = JSON.parse(storedToken);
  } catch (error) {
    console.log("Error parsing token");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload; // This should be null or a valid token
    },
  },
});

// Export actions and reducer
export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
