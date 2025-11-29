import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./Reducer/todosSlice.js";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
