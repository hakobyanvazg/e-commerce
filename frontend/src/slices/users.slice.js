import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-toastify";
import { setHeaders } from "./api";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/delete/${id}`,
      setHeaders()
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response.data);
  }
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersFetch.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(usersFetch.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "success";
    });
    builder.addCase(usersFetch.rejected, (state, action) => {
      state.status = "rejected";
    });
    //
    builder.addCase(userDelete.pending, (state, action) => {
      state.deleteStatus = "pending";
    });
    builder.addCase(userDelete.fulfilled, (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
      toast.error("User Deleted!", {
        position: "bottom-left",
      });
    });
    builder.addCase(userDelete.rejected, (state, action) => {
      state.deleteStatus = "rejected";
    });
  },
});

export default usersSlice.reducer;
