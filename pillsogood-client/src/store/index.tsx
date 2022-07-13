import { configureStore } from "@reduxjs/toolkit";
import { diseaseSlice } from "./diseaseSlice";
import { loginSlice } from "./loginSlice";
export const store = configureStore({
  reducer: {
    disease: diseaseSlice.reducer,
    login: loginSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
