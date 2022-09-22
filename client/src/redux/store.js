import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./reducers";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
