import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddtoCart = createAsyncThunk("AddtoCart", async (cartdata, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/add-cart`,cartdata);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchlandingPageCategories = createAsyncThunk("fetchlandingpageCategories", async (__, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subCategory/landingCategories`);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartloading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(AddtoCart.pending, (state, action) => {
                state.cartloading = true;
                state.error = null;
            })
            .addCase(AddtoCart.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(AddtoCart.rejected, (state, action) => {
                state.cartloading = false;
                state.error = action.payload;
            })
           
    }
})

export default cartSlice.reducer;