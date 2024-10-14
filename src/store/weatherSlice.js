import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location) => {
    const apiKey = '{Your API Key}';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    
    console.log('Current Weather Data:', response.data); // Looging in console to check what we are getting as output
    return response.data;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (location) => {
    const apiKey = '{Your API Key}';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
    );

    console.log('5-Day Forecast Data:', response.data);
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    forecast: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast = action.payload.list;
      });
  },
});

export default weatherSlice.reducer;
