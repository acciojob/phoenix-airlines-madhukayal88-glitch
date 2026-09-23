import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchFlights = createAsyncThunk('flights/search', async (params) => {
  const response = await axios.get('/api/flights', { params });
  return response.data;
});

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default flightSlice.reducer;
