import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "../slices/products.slice";
import cartReducer, { getTotals } from "../slices/cart.slice";
import authReducer, { loadUser } from "../slices/auth.slice";
import ordersReducer from "../slices/orders.slice";
import usersReducer from "../slices/users.slice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));
