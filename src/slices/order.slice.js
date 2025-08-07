import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { promise } from "zod";

export const addOrder = createAsyncThunk("addOrder", async (orderData, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`, orderData)
        const data = res.data;
        if (data.success) {
            return data.data;
        }
        else {
            return thunkAPI.rejectWithValue(data.message);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getOrderByUserId = createAsyncThunk(
  "getOrderByUserId",
  async ({ id }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/getUserOrder/${id}`
      );
      const orders = res?.data?.data;

      if (!Array.isArray(orders)) {
        return thunkAPI.rejectWithValue("Invalid order data");
      }

      const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
          const enrichedItems = await Promise.all(
            order.items.map(async (item) => {
              try {
                const itemRes = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/items/item/${item.item}`
                );
                const itemDetails = itemRes.data?.data;

                return {
                  itemId: item.item,
                  name: itemDetails.name,
                  companyId: itemDetails.companyId,
                  qty: item.quantity,
                  image: itemDetails.logoImage,
                  total: item.total || itemDetails.price * item.quantity,
                  price: itemDetails.price,
                  discount: itemDetails.discount || 0,
                };
              } catch (error) {
                console.error("Item fetch error:", error);
                return null;
              }
            })
          );

          return {
            ...order,
            items: enrichedItems.filter(Boolean), // replace with enriched
          };
        })
      );

      return enrichedOrders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/${id}`
      );
      const orders = res?.data;
      if(orders.success){
        return orders.data;
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: null,
        orderloading: false,
        error: null
    },
    extraReducers: (builder) => {
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
            .addCase(getOrderById.pending, (state, action) => {
                state.orderloading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.orderloading = false;
                state.orders = action.payload
                state.error = null;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.orderloading = false;
                state.error = action.payload;
            })
            .addCase(getOrderByUserId.pending, (state, action) => {
                state.orderloading = true;
                state.error = null;
            })
            .addCase(getOrderByUserId.fulfilled, (state, action) => {
                state.orderloading = false;
                state.orders = action.payload
                state.error = null;
            })
            .addCase(getOrderByUserId.rejected, (state, action) => {
                state.orderloading = false;
                state.error = action.payload;
            })
    }
})

export default orderSlice.reducer;