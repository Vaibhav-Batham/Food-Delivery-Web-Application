import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MyShopData: null, // user logged out by default
  
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setMyShopData: (state, action) => {
      state.MyShopData = action.payload;
    },
    signOut: (state) => {
      state.MyShopData = null;
      state.city = null;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setMyShopData, signOut, setCity } = ownerSlice.actions;
export default ownerSlice.reducer;
