import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import categoryReducer from "../slices/Category.slice";
import itemReducer from "../slices/items.slice";
import companiesReducer from "../slices/company.slice";
import cartReducer from "../slices/Cart.slice";
import orderReducer from "../slices/order.slice";
import brandReducer from "../slices/brand.slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    items: itemReducer,
    companies: companiesReducer,
    cart: cartReducer,
    order: orderReducer,
    brand: brandReducer,
  },
})