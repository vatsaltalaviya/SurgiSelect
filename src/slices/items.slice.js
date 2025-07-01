import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItemsBySubCategory = createAsyncThunk("fetchItemsBySubCategory", async (subcategoryid, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/item-List/${subcategoryid}`);
        const data = res.data;
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})
export const fetchItemsById = createAsyncThunk("fetchItemsById", async (id, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/item/${id}`);
        const data = res.data;
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsBySubCategory.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsBySubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItemsBySubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchItemsById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsById.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItemsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default itemSlice.reducer;