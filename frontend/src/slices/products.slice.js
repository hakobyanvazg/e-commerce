import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${API_URL}/products`,
        values,
        setHeaders()
      );

      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/update/${values.product._id}`,
        values,
        setHeaders()
      );

      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/products/delete/${id}`,
        setHeaders()
      );

      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
    builder
      .addCase(productsCreate.pending, (state, action) => {
        state.createStatus = "pending";
      })
      .addCase(productsCreate.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.items?.push(action.payload);
        toast.success("Product Created!");
      })
      .addCase(productsCreate.rejected, (state, action) => {
        state.createStatus = "rejected";
      });
    builder
      .addCase(productsDelete.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(productsDelete.fulfilled, (state, action) => {
        // console.log(state.items);
        const newList = state.items.filter(
          (item) => item?._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.error("Product Deleted!");
      })
      .addCase(productsDelete.rejected, (state, action) => {
        state.deleteStatus = "rejected";
      });
    builder
      .addCase(productsEdit.pending, (state, action) => {
        state.editStatus = "pending";
      })
      .addCase(productsEdit.fulfilled, (state, action) => {
        const updatedProducts = state.items.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.items = updatedProducts;
        state.editStatus = "success";
        toast.info("Product Updated!");
      })
      .addCase(productsEdit.rejected, (state, action) => {
        state.editStatus = "rejected";
      });
  },
});

export default productsSlice.reducer;
