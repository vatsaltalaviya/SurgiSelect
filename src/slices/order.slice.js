import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrder = createAsyncThunk("addOrder",async(orderData,thunkAPI)=>{
    console.log(orderData);
    
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`,orderData)
        const data= res.data;
        if(data.success){
            return data.data;
        }
        else{
            return thunkAPI.rejectWithValue(data.message);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
const orderSlice = createSlice({
    name:"order",
    initialState:{
        orders:null,
        orderloading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addOrder.pending, (state, action) => {
                        state.orderloading = true;
                        state.error = null;
                    })
                    .addCase(addOrder.fulfilled, (state, action) => {
                        state.orderloading = false;
                        state.orders = action.payload
                        state.error = null;
                    })
                    .addCase(addOrder.rejected, (state, action) => {
                        state.orderloading = false;
                        state.error = action.payload;
                    })
    }
})

export default orderSlice.reducer;