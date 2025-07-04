import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("Adduser", async (userData,thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData)
        const data = res.data;
        if(res.status === 201) {
        localStorage.setItem("user",data.user._id);
        localStorage.setItem("username",data.user.name);
            return data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const loginUser = createAsyncThunk("loginUser", async (userData,thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)
        const data = res.data;
        
        if(res.status === 200) {
        localStorage.setItem("user",data.data.userId);
        localStorage.setItem("username",data.data.name);
            return data.data;
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
export const AddAddress = createAsyncThunk("AddAddress", async (addressData,thunkAPI) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/address/createAddress`, addressData)
      
        const data = res.data;
        if(data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const getUserAddress = createAsyncThunk("getUserAddress", async (userId,thunkAPI) => {

    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/address/getByUserId/${userId}`)
        const data = res.data;
        if(data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});

const userslices = createSlice({
    name: 'users',
    initialState: {
        user: null,
        address :[],
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
        .addCase(loginUser.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
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
        })
        .addCase(AddAddress.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(AddAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload
            state.error = null;
        })
        .addCase(AddAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getUserAddress.pending, (state, action) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload
            state.error = null;
        })
        .addCase(getUserAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

})

export default userslices.reducer;