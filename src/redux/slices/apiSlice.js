import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSubscriptionOrder = createAsyncThunk("api/post", async (payload, { rejectWithValue }) => {
  try {
    const { url, data } = payload;
    const response = await axios.post(url, data);
    // const response = await axios.post(`${payload.url}${payload.path}`, payload.data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
}
);

export const fetchSubscriptionDetails = createAsyncThunk("api/get", async (payload, { rejectWithValue }) => {
  try {
    const { url, path } = payload;
    const response = await axios.get(`${url}${path}`);
    const { data } = response;
    return data;
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
});

export const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: true
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionDetails.fulfilled, (state, { payload, meta }) => {
        const { path } = meta.arg;
        state[path] = { ...payload };
        state.loading = false;

      })
      .addCase(createSubscriptionOrder.fulfilled, (state, { payload, meta }) => {
        const { path } = meta.arg;
        const length = Object.values(state[path] || {}).length;
        state[path] = { ...state[path], [length]: payload };
        state.loading = false;
      });
  },
});
export const getSubscriptionData = (state, path) => state.api[path] || {};
export const getAPIProperty = (state, name) => {
  return state.api[name];
};
export default apiSlice.reducer;
