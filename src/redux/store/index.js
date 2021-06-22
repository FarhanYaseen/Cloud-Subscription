import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../slices/apiSlice';
import subscriptionSlice from '../slices/subscriptionSlice';
import creditCardSlice from '../slices/creditCardSlice';

export const store = configureStore({
  reducer: {
    api: apiSlice,
    subscription: subscriptionSlice,
    creditCard: creditCardSlice,
  },
});
