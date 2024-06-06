import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../Slices/todoslice";

const Store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default Store;
