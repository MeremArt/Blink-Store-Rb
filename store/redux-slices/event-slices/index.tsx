import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [] as any[],
};

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({
        ...action.payload.product,
        blink: action.payload.blink,
      });
    },
    clearEvents: (state) => {
      state.events = [];
    },
  },
});
export const { addEvent, clearEvents } = EventSlice.actions;
export {EventSlice};
