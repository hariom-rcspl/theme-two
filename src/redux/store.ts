import { configureStore, Tuple } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { encryptTransform } from "redux-persist-transform-encrypt";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root", // <-- FIXED
  storage,
  whitelist: ["auth"],
  transforms: [encryptTransform({ secretKey: "my-secret-key" })],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: pReducer,
  middleware: () => new Tuple(thunk),
});

const persistor = persistStore(store);
export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootStoreState = ReturnType<typeof store.getState>;
