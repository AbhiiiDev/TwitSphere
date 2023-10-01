import {createSlice} from "@reduxjs/toolkit";
const inititalState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  inititalState,
  reducers: {

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends:(state,action)=>{
        if(state.user)
        {
            state.user.friends=action.payload.friends;

        }else {
            console.error("user friends do not exist :(");
        }
    },
    setPosts:(state,action)=>{
        state.posts=action.payload.posts;
    },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
  },
});

export const {setMode,setLogin,setLogout,setFriends,setPost,setPosts}=authSlice.actions;
export default authSlice.reducer;

