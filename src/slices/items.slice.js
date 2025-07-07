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
export const fetchItems = createAsyncThunk("fetchItems", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items`);
        const data = res.data
        if (data.success) {
            return data.data.map((item)=>({
            id:item._id,
            name:item.name,
        }));
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
export const fetchMultipleItemsById = createAsyncThunk(
  "fetchMultipleItemsById",
  async (cartItems, thunkAPI) => {
    try {
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/item/${item.itemId}`);
            const itemDetails = res.data?.data;

            if (!itemDetails) return null;

            // Fetch company name
            let companyName = "Unknown";
            if (itemDetails.companyId) {
              try {
                const companyRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/company/${itemDetails.companyId}`);
                companyName = companyRes.data?.data?.name || "Unknown";
              } catch (companyErr) {
                console.warn("Company fetch failed:", companyErr);
              }
            }

            return {
              itemId: item.itemId,
              name: itemDetails.name,
              companyId: itemDetails.companyId,
              companyName,
              qty: item.qty,
              price: item.price,
              image: itemDetails.logoImage,
              discount: itemDetails.discount || 0,
              total: item.qty * item.price,
            };
          } catch (err) {
            console.warn("Item fetch failed:", err);
            return null;
          }
        })
      );

      return enrichedItems.filter(Boolean); // remove nulls
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch multiple items with company names");
    }
  }
);


export const fetchItemsBySearch = createAsyncThunk("fetchItemsBySearch", async ({ name, page }, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/searchAll/${name}?page=${page}`);

        const data = res.data;
        if (data.success) {
            return { items: data.data, page };
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})
export const fetchSuggestions = createAsyncThunk("fetchSuggestions", async (input, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/suggestion/${input}`);
        const data = res.data;
        if (data.success) {
            return data.suggestions
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");
    }
})

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        suggestions: [],
        loading: false,
        subcategoryLoading: false,
        error: null,
        hasMore: true,
    },
    reducers: {
        resetItems: (state) => {
            state.items = [];
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.subcategoryLoading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.subcategoryLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.subcategoryLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchMultipleItemsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMultipleItemsById.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchMultipleItemsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchItemsBySubCategory.pending, (state) => {
                state.subcategoryLoading = true;
                state.error = null;
            })
            .addCase(fetchItemsBySubCategory.fulfilled, (state, action) => {
                state.subcategoryLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItemsBySubCategory.rejected, (state, action) => {
                state.subcategoryLoading = false;
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
            .addCase(fetchSuggestions.pending, (state, action) => {

                state.error = null;
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {

                state.suggestions = action.payload;
                state.error = null;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {

                state.error = action.payload;
            })
            .addCase(fetchItemsBySearch.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsBySearch.fulfilled, (state, action) => {
                state.loading = false;
                const newItems = action.payload.items;

                if (action.payload.page === 1) {
                    state.items = newItems;
                } else {
                    state.items = [...state.items, ...newItems];
                }

                // Check if more items available (based on API response or length)
                state.hasMore = newItems.length > 0;
                state.error = null;
            })
            .addCase(fetchItemsBySearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default itemSlice.reducer;
export const { resetItems } = itemSlice.actions