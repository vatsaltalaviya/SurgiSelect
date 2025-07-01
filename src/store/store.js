import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import categoryReducer from "../slices/Category.slice";
import itemReducer from "../slices/items.slice";
import companiesReducer from "../slices/company.slice";
export const store = configureStore({
  reducer: {
    user : userReducer,
    category : categoryReducer,
    items: itemReducer,
    companies: companiesReducer,
  },
})