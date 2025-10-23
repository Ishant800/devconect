import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import userReducer from '../features/auth/auth'
export const store = configureStore({
    reducer:{
        posts:postsReducer,
        user:userReducer
    }
})