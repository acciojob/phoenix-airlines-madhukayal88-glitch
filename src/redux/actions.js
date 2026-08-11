export const SET_FLIGHT = 'SET_FLIGHT';
export const SET_BOOKING = 'SET_BOOKING';
export const RESET_BOOKING = 'RESET_BOOKING';

export const setFlight = (data) => ({
  type: SET_FLIGHT,
  payload: data
});

export const setBooking = (data) => ({
  type: SET_BOOKING,
  payload: data
});

export const resetBooking = () => ({
  type: RESET_BOOKING
});
