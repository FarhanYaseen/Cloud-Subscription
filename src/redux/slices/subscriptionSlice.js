import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  duration: 12,
  pricePerGB: 2,
  storage: 5,
  discount: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setProperty(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setData(state, action) {
      const { name, value } = action.payload;
      state[name] = { ...state[name], ...value };
    },
    resetSubscriptionData: () => initialState
  },
});

export const { setProperty, setData, resetSubscriptionData } = subscriptionSlice.actions;
export const getProperty = (state, name) => {
  if (name !== 'discount')
    return parseInt(state.subscription[name]);
  return state.subscription[name];
};
export const getData = (state) => {
  return state.subscription
}

export default subscriptionSlice.reducer;
