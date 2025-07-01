import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("Adduser", async (userData,thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData)
        const data = res.data;
        if(res.status === 201) {
        localStorage.setItem("user",data.user._id);
            return data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const sendOTP = createAsyncThunk("sendOTP", async (email,thunkAPI) => {
    try {  
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/sendOtp`, {email})
        const data = res.data;
        // console.log(res.data);
        
        if(res.status === 200) {
            return data.msg
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const verifyOTP = createAsyncThunk("verifyOTP", async ({ email, otp },thunkAPI) => {
    console.log(email, otp);
    
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/verifyOtp`, { email, otp })
        const data = res.data;
        if(res.status === 200) {
            return data.msg;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});

const userslices = createSlice({
    name: 'users',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(sendOTP.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(sendOTP.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(sendOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(verifyOTP.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyOTP.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(verifyOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

})

export default userslices.reducer;