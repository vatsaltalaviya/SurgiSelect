import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddtoCart = createAsyncThunk("AddtoCart", async (cartdata, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/add-cart`, cartdata);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchAllCartItem = createAsyncThunk("fetchAllCartItem", async (userId, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/user-cart/${userId}`);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchCartWithItemDetails = createAsyncThunk(
    "fetchCartWithItemDetails",
    async (userId, thunkAPI) => {
        try {
            // 1. Fetch cart data
            const cartRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/user-cart/${userId}`);
            const cartData = cartRes.data?.data;

            // 2. Loop through cart items and enrich them
            const enrichedItems = await Promise.all(
                cartData.items.map(async (item) => {
                    try {
                        // 2a. Fetch item details
                        const itemRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/item/${item.itemId}`);
                        const itemDetails = itemRes.data?.data;

                        // 2b. Fetch company name
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
                            total: item.total,
                            image: itemDetails.logoImage,
                            total: item.total, // Already from cart
                            discount: itemDetails.discount || 0, // From item data
                        };
                    } catch (itemErr) {
                        console.error("Item fetch failed:", itemErr);
                        return null;
                    }
                })
            );

            // 3. Return final cart object
            return {
                id: cartData._id,
                finalTotal: cartData.finalTotal,
                items: enrichedItems.filter(Boolean),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch cart");
        }
    }
);
export const updateFetchCart = createAsyncThunk(
    "updateFetchCart",
    async (userId, thunkAPI) => {
        try {
            // 1. Fetch cart data
            const cartRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/user-cart/${userId}`);
            const cartData = cartRes.data?.data;

            // 2. Loop through cart items and enrich them
            const enrichedItems = await Promise.all(
                cartData.items.map(async (item) => {
                    try {
                        // 2a. Fetch item details
                        const itemRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/item/${item.itemId}`);
                        const itemDetails = itemRes.data?.data;

                        // 2b. Fetch company name
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
                            total: item.total,
                            image: itemDetails.logoImage,
                            total: item.total, // Already from cart
                            discount: itemDetails.discount || 0, // From item data
                        };
                    } catch (itemErr) {
                        console.error("Item fetch failed:", itemErr);
                        return null;
                    }
                })
            );

            // 3. Return final cart object
            return {
                id: cartData._id,
                finalTotal: cartData.finalTotal,
                items: enrichedItems.filter(Boolean),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch cart");
        }
    }
);
export const updateCartQuantity = createAsyncThunk(
    "updateCartQuantity",
    async (QtyData, thunkAPI) => {
        try {

            const cartRes = await axios.put(`${import.meta.env.VITE_BASE_URL}/cart/update-cart`, QtyData);
            const cartData = cartRes.data;
            if (cartData.success) {
                return cartData.data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch cart");
        }
    }
);
export const deleteItemFormCart = createAsyncThunk(
    "deleteItemFormCart",
    async (itemId, thunkAPI) => {
        const userId = localStorage.getItem("user")
        try {
            const cartRes = await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/remove/${userId}/${itemId}`,);
            const cartData = cartRes.data;
            if (cartData.success) {
                return cartData.data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch cart");
        }
    }
);



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartloading: false,
        Updateloading: false,
        Deleteloading: false,
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
            .addCase(fetchAllCartItem.pending, (state, action) => {
                state.cartloading = true;
                state.error = null;
            })
            .addCase(fetchAllCartItem.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(fetchAllCartItem.rejected, (state, action) => {
                state.cartloading = false;
                state.error = action.payload;
            })
            .addCase(fetchCartWithItemDetails.pending, (state, action) => {
                state.cartloading = true;
                state.error = null;
            })
            .addCase(fetchCartWithItemDetails.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(fetchCartWithItemDetails.rejected, (state, action) => {
                state.cartloading = false;
                state.error = action.payload;
            })
            .addCase(updateFetchCart.pending, (state, action) => {
                state.error = null;
            })
            .addCase(updateFetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(updateFetchCart.rejected, (state, action) => {
                state.cartloading = false;
                state.error = action.payload;
            })
            .addCase(updateCartQuantity.pending, (state, action) => {
                state.Updateloading = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const updatedItem = action.payload;

                const itemIndex = state.cart.items.findIndex(
                    (i) => i.itemId === updatedItem.itemId
                );

                if (itemIndex !== -1) {
                    state.cart.items[itemIndex].qty = updatedItem.qty;
                    state.cart.items[itemIndex].total = updatedItem.total;
                    state.cart.finalTotal = updatedItem.finalTotal; // if backend returns it
                }

                state.Updateloading = false;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.Updateloading = false;
                state.error = action.payload;
            })
            .addCase(deleteItemFormCart.pending, (state, action) => {
                state.Deleteloading = true;
                state.error = null;
            })
            .addCase(deleteItemFormCart.fulfilled, (state, action) => {
                state.Deleteloading = false;
            })
            .addCase(deleteItemFormCart.rejected, (state, action) => {
                state.Deleteloading = false;
                state.error = action.payload;
            })

    }
})

export default cartSlice.reducer;