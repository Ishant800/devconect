import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../../utility/tokendeocde";



export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await axios.get("http://localhost:8081/public/posts");
  return res.data;
});

export const fetchPostDetails = createAsyncThunk("posts/fetchDetails", async (id) => {
  const res = await axios.get(`http://localhost:8081/public/post/${id}`);
  return res.data;
});

export const addPost = createAsyncThunk("posts/add", async ({ content, image }) => {
  const user = token(); 

  const formData = new FormData();
  formData.append("userId", user.sub);
  formData.append("content", content);
  if (image) formData.append("imageUrl", image);

  const res = await axios.post("http://localhost:8081/public/addpost", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});


export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  const res = await axios.delete(`http://localhost:8081/public/post/${id}`);
  return id; 
});


export const addComment = createAsyncThunk("posts/addComment", async ({ userId, text, projectId }) => {
  const res = await axios.post("http://localhost:8081/public/addcomment", {
    userId: parseInt(userId),
    text,
    projectId,
  });
  return res.data;
});


const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postDetails: null,
    postsStatus: "idle",
    detailsStatus: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.postsStatus = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsStatus = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postsStatus = "failed";
        state.error = action.error.message;
      })

      // 🔹 Fetch single post details
      .addCase(fetchPostDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.postDetails = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.error.message;
      })

      // 🔹 Add new post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // 🔹 Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
