import { SET_FLIGHT, SET_BOOKING, RESET_BOOKING } from './actions';

const initialState = {
  flight: null,
  booking: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FLIGHT:
      return { ...state, flight: action.payload };
    case SET_BOOKING:
      return { ...state, booking: action.payload };
    case RESET_BOOKING:
      return { ...state, booking: null, flight: null };
    default:
      return state;
  }
}
