import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './wetherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
