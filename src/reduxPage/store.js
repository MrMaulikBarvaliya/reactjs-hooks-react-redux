import { configureStore } from "@reduxjs/toolkit";
import ReduxSlice from "./createSlice/CreateSlice";

export const store = configureStore({
  reducer: {
    app: ReduxSlice,
  },
});
