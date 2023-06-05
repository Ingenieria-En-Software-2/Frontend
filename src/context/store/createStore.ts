import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducers/";
import { dbApi } from "services/dbApi";

export default function getStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbApi.middleware),
  });
}
