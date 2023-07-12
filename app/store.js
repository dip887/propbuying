import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import thunkMiddleware from "redux-thunk";
import { setUser } from "../features/auth/authSlice";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser(user));
    const data = {
      email: user.providerData[0].email || "",
      name: user.providerData[0].displayName || "",
      phoneNumber: user.providerData[0].phoneNumber || "",
    };
    localStorage.setItem("enquiryData", JSON.stringify(data));
  }
});

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: [thunkMiddleware],
});
