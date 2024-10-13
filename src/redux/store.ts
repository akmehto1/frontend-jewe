import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './user/userslice';
import { createTransform } from 'redux-persist';

const rootReducer = combineReducers({ user: userReducer });

// Expiration time set to 24 hours (86400000 ms)
const expirationTime = 43200000;  // 60 seconds * 1000 milliseconds

// Create a custom transform to add and check the expiration time
const expireTransform = createTransform(
  // On save (inbound state)
  (inboundState, key) => {
    return {
      ...inboundState || {},
      _persistedAt: Date.now(),
    };
  },
  // On load (outbound state)
  (outboundState, key) => {
    if (!outboundState) return outboundState;

    const now = Date.now();
    const persistedAt = outboundState._persistedAt;

    // Check if more than 24 hours have passed since state was persisted
    if (now - persistedAt > expirationTime) {
      return undefined; // Expire the state
    }

    return outboundState;
  },
  { whitelist: ['user'] } // Only apply to the 'user' reducer
);

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  transforms: [expireTransform], // Apply the expiration transform
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
