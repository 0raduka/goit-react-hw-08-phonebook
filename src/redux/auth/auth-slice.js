import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLogging: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      // console.log('REGISTER', action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.isLogging = true;
      // console.log('state.isLogging', state.isLogging);
    },
    [authOperations.logIn.rejected](state, action) {
      state.isLogging = false;
      state.loginError =
        action.error.message === 'Request failed with status code 401'
          ? 'Invalid username or password'
          : 'Something went wrong!';
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLogging = false;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      // console.log('fetchCurrentUser SLICE', state.isLoggedIn);
    },
  },
});

export default authSlice.reducer;
