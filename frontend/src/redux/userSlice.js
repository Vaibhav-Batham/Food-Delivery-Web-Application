import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null, // user logged out by default
  city: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    signOut: (state) => {
      state.userData = null;
      state.city = null;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setUserData, signOut, setCity } = userSlice.actions;
export default userSlice.reducer;
