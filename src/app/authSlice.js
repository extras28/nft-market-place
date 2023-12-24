const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// MARK: --- Thunks ---

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSigningIn: false,
    current: '',
  },
  reducers: {
    signOut: (state, action) => {
      state.error = '';
      state.current = {};
    },
    getAccount: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {
    // Sign in
  },
});

const { reducer, actions } = authSlice;
export const { signOut, getAccount } = actions;
export default reducer;
