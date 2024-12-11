import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const globalStore = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export default globalStore;