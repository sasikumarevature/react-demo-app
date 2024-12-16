import { createSlice } from '@reduxjs/toolkit';
// Lightweight library to manage cookies in the browser
import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('auth_token') || null, // Read the token from cookies
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // Set token in HttpOnly cookie using the backend
      // For frontend (if backend setup is unavailable), set it securely:
      Cookies.set('auth_token', action.payload, {
        secure: true,        // Ensures cookies are sent only over HTTPS
        sameSite: 'Strict',  // Prevent CSRF attacks
        expires: 1,          // Optional: Set expiration (1 day in this example)
      });
    },
    clearToken: (state) => {
      state.token = null;
      // Remove token from cookies
      Cookies.remove('auth_token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectIsLoggedIn = (state) => !!state.auth.token;

export default authSlice.reducer;
