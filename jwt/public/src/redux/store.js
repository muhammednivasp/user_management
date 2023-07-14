import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import adminReducer from './adminSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)


const store = configureStore({
  reducer: {
    user: persistedReducer,
    admin: persistedAdminReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
