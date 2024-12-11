import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null, 
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload; // Action set or update token to the store
      },
      clearToken: (state) => {
        state.token = null; // Action to clear the token from the store
      },
    },
  });

  export const { setToken, clearToken } = authSlice.actions;
  export default authSlice.reducer;