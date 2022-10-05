import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'posts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
      postsFetch: (state) => {
          state.status = 'loading';
          state.posts = [];
      },
      postsSuccess: (state, action) => {
          state.status = 'success';
          state.posts = action.payload;
      },
      postsFail: (state) => {
          state.status = 'fail';
          state.posts = [];
      },
  }
});

export const { postsFetch, postsSuccess, postsFail } = counterSlice.actions;

export const selectPosts = (state) => state.posts;

export default counterSlice.reducer;
