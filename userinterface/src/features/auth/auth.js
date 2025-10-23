import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login",async({email,password})=>{
const response = await axios.post("http://localhost:8081/auth/login",{email,password});
return response.data;
})

export const signup = createAsyncThunk("signup",async({username,email,password})=>{
    const response = await axios.post("http://localhost:8081/auth/signup",{username,email,password})
    return response.data;
})

export const userinfo = createAsyncThunk("userinfo",async(userid)=>{
    const response = await axios.get(`http://localhost:8081/auth/${userid}`)
    return response.data;
})

export const updateProfile= createAsyncThunk("userinfoupdate",async(formData)=>{
    const response = await axios.put("http://localhost:8081/auth/updateprofile",formData,
       { headers:{
            "Content-Type": "multipart/form-data"
        }}
    )
    return response.data
})

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(login.pending,(state)=>{
            state.status = "pending"
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload
            localStorage.setItem("token",action.payload.accessToken)
            
        })
        builder.addCase(login.rejected,(state,error)=>{
            state.error = error.message;
            state.status = "rejected";
        })


        builder.addCase(signup.pending,(state)=>{
            state.status = "pending";
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.user = action.payload.user;
            localStorage.setItem('token',action.payload.accessToken)
            state.status = "fullfilled";
        })

        builder.addCase(signup.rejected,(state,error)=>{
            state.error = error.message;
            state.status = "rejected";

        })


        builder.addCase(userinfo.pending,(state)=>{
            state.status = "pending"
        })
        builder.addCase(userinfo.fulfilled,(state,action)=>{
            state.status = "fulfilled"
            state.user = action.payload
        })

        builder.addCase(userinfo.rejected,(state,error)=>{
            state.error = error.message;
            state.status = "rejected";
        })
    }
})


export default userSlice.reducer;