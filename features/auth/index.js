import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    loading: false,
    user: {
      name: "",
      email: "",
      id: "",
      profilePic: "",
    },
  },
  reducers: {
    login(state, action) {
      state.logged = true;
      state.loading = false;
      state.user.id = action.payload.id;
      state.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.profilePic = action.payload.profilePic;
    },
    logout(state, action) {
      state.logged = false;
      state.loading = false;
      state.user.id = "";
      state.name = "";
      state.user.email = "";
      state.user.profilePic = "";
    },
  },
});

const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;

export default authReducer;
