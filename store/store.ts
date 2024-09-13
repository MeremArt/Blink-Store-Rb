import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./redux-slices/product-slice";
import { EventSlice } from "./redux-slices/event-slices";

export const store = configureStore({
  reducer: {
   product :productSlice.reducer,
   event: EventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
