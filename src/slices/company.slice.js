import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCompanies = createAsyncThunk("fetchAllCompanies", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/company`);
        const data = res.data
        if (res.status === 200) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})
export const fetchCompanyById = createAsyncThunk("fetchCompanyById", async (id, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/company/${id}`);
        
        const data = res.data
        if (res.status === 200) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})

const companySlice = createSlice({
    name: "company",
    initialState: {
        company: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
                state.error = null;
            })
            .addCase(fetchAllCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCompanyById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanyById.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
                state.error = null;
            })
            .addCase(fetchCompanyById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default companySlice.reducer;