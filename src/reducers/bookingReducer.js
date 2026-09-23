import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBooking = createAsyncThunk('booking/create', async (bookingData) => {
  const response = await axios.post('/api/bookings', bookingData);
  return response.data;
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    current: null,
    loading: false,
    error: null
  },
  reducers: {
    clearBooking: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
