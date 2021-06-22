import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '', 
  number: '',
  cvc: '',
  expiry: '',
  email: ''
};

const subscriptionSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {
    setCreditCardProperty(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetCreditCardData: state => initialState
  },
});

export const { setCreditCardProperty, resetCreditCardData } = subscriptionSlice.actions;
export const getCreditCardProperty = (state, name) => state.creditCard[name]
export const getCreditCardData = (state) => { return state.creditCard }

export default subscriptionSlice.reducer;
