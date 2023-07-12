import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setError, setLoading } = authSlice.actions;
export const selectUser = (state) => state.auth.currentUser;
export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export default authSlice.reducer;
