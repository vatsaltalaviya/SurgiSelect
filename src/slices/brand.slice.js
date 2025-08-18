import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { promise } from "zod";


export const getBrand = createAsyncThunk(
  "getBrand",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/brands`
      );
      const orders = res?.data 
      if(orders.success) {
        return orders.brands;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);


const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands: null,
        brandloading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrand.pending, (state, action) => {
                state.brandloading = true;
                state.error = null;
            })
            .addCase(getBrand.fulfilled, (state, action) => {
                state.brandloading = false;
                state.brands = action.payload
                state.error = null;
            })
            .addCase(getBrand.rejected, (state, action) => {
                state.brandloading = false;
                state.error = action.payload;
            })
         
    }
})

export default brandSlice.reducer;