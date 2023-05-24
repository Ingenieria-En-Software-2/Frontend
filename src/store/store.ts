import { configureStore } from "@reduxjs/toolkit/";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { dbApi } from "services/dbApi";

export const store = configureStore({
  reducer: {
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
