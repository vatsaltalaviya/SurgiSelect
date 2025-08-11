import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("Adduser", async (userData, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData);
        const data = res.data;

        if (res.status === 201) {
            localStorage.setItem("user", data.user._id);
            localStorage.setItem("username", data.user.name);
            localStorage.setItem("usernumber", data.user.number);
            localStorage.setItem("useremail", data.user.email);
            return data.user;
        } else {
            return thunkAPI.rejectWithValue(data?.msg || "Registration failed");
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.msg || error.message || "Something went wrong"
        );
    }
});

export const loginUser = createAsyncThunk("loginUser", async (userData, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)
        const data = res.data;

        if (res.status === 200) {
            localStorage.setItem("user", data.data.userId);
            localStorage.setItem("username", data.data.name);
            localStorage.setItem("useremail", data.data.email);
            localStorage.setItem("usernumber", data.data.number);
            return data.data;
        }

    } catch (error) {
        if (error.response?.status === 401) {
            return thunkAPI.rejectWithValue("Invalid username or password");
        }
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const sendOTP = createAsyncThunk("sendOTP", async ({ email }, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/sendOtp`, { email });

        // Ensure we return actual success message
        const data = res.data;

        if (res.status === 200 && data.msg) {
            return data.msg;
        } else {
            return thunkAPI.rejectWithValue("Failed to send OTP");
        }
    } catch (error) {
        // Extract backend message properly
        const errMsg = error.response?.data?.msg || "Something went wrong";
        return thunkAPI.rejectWithValue(errMsg);
    }
});

export const sendforgetOTP = createAsyncThunk("sendforgetOTP", async (email, thunkAPI) => {



    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/sendforgotOtp`, { email });
            console.log(res);
            

        // Ensure we return actual success message
        const data = res.data;

        if (res.status === 200 && data.msg) {
            return data.msg;
        } else {
            return thunkAPI.rejectWithValue("Failed to send OTP");
        }
    } catch (error) {
        // Extract backend message properly
        const errMsg = error.response?.data?.msg || "Something went wrong";
        return thunkAPI.rejectWithValue(errMsg);
    }
});

export const resetpassword = createAsyncThunk("resetpassword", async ({ email, newPassword }, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/changePassword`, { email, newPassword });

        // Ensure we return actual success message
        const data = res.data;

        if (res.status === 200 && data.msg) {
            return data.msg;
        } else {
            return thunkAPI.rejectWithValue("Failed to send OTP");
        }
    } catch (error) {
        // Extract backend message properly
        const errMsg = error.response?.data?.msg || "Something went wrong";
        return thunkAPI.rejectWithValue(errMsg);
    }
});

export const verifyOTP = createAsyncThunk("verifyOTP", async ({ email, fullOtp }, thunkAPI) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/verifyOtp`, { email, otp: fullOtp })
        const data = res.data;
        if (res.status === 200) {
            return data.msg;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const AddAddress = createAsyncThunk("AddAddress", async (addressData, thunkAPI) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/address/createAddress`, addressData)

        const data = res.data;
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const getUserAddress = createAsyncThunk("getUserAddress", async (userId, thunkAPI) => {

    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/address/getByUserId/${userId}`)
        const data = res.data;
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});
export const deleteAddress = createAsyncThunk("deleteAddress", async (id, thunkAPI) => {

    try {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/address/deleteAddress/${id}`)
        const data = res.data;
        if (data.success) {
            return data.message;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
});

const userslices = createSlice({
    name: 'users',
    initialState: {
        user: null,
        email: null,
        address: [],
        selectedAddress: 0,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        getemailforreset: (state, action) => {
            state.email = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
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
            .addCase(loginUser.pending, (state, action) => {
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
            .addCase(sendOTP.pending, (state, action) => {
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
            .addCase(sendforgetOTP.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendforgetOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendforgetOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOTP.pending, (state, action) => {
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
            .addCase(resetpassword.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetpassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resetpassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddAddress.pending, (state, action) => {
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
            .addCase(getUserAddress.pending, (state, action) => {
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
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export default userslices.reducer;
export const { setSelectedAddress, getemailforreset } = userslices.actions;