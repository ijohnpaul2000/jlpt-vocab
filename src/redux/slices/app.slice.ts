import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isDarkMode: boolean;
  isSideBarOpen: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
  isSideBarOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;
