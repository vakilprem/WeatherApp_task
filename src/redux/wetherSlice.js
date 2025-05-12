import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_ID;
const BASE_URL = import.meta.env.VITE_APP_API;

const buildWeatherUrl = (endpoint, city) =>
  `${BASE_URL}${endpoint}?q=${city}&appid=${API_KEY}&units=metric`;

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (city) => {
    const res = await axios.get(buildWeatherUrl("weather", city));
    return res.data;
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const res = await axios.get(buildWeatherUrl("forecast", city));
    return res.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    forecast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast = action.payload.list;
        state.loading = false;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
