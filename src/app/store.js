// Import reducers
import appReducer from './appSlice';
import authReducer from './authSlice';

const { configureStore } = require('@reduxjs/toolkit');

// root reducer
const rootReducer = {
  app: appReducer,
  auth: authReducer,
};

// app store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_DEV_TOOLS == 1 ? true : false,
});

export default store;
