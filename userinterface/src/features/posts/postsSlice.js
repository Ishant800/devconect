import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../../utility/tokendeocde";

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    const response = await axios.get('http://localhost:8081/public/posts')
    console.log(response.data)
    return response.data;

})
  const user = token()
  

export const addPost = createAsyncThunk('addpost',async({content,image})=>{

     const formData = new FormData();
     formData.append("userId",user.sub)
     formData.append("content",content)
     if(image) {
        formData.append("imageUrl",image)
     }


    const response = await axios.post("http://localhost:8081/public/addpost",formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
})

export const addComment = createAsyncThunk("addcomment",async(formdata)=>{
    const response = await axios.post("http://localhost:8081/public/addcomment",(
        { userId:parseInt(formdata.userId),
            text:formdata.text,
        projectId:formdata.projectId}))
})



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts:[],
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status = "loading";
            
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
         state.status = "succeeded";
         state.posts = action.payload; 
         console.log(action.payload)
        })

    .addCase(fetchPosts.rejected,(state,error)=>{
        state.status = "rejected";
        state.error = error.messsage;
    })


    .addCase(addPost.pending,(state)=>{
        state.status = "pending"
        
    })

    .addCase(addPost.fulfilled,(state,action)=>{
        state.status = "fulfilled"
        console.log(action.payload)
        state.posts.push(action.payload) 
    })
    }

})


export default postsSlice.reducer;