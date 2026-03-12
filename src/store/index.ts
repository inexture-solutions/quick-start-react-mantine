import storage from 'redux-persist/es/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { appReducer } from '@/store/app/app.reducer.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { apiService } from '@services/api.service.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  keyPrefix: 'pro:',
  key: 'pro',
  storage,
  stateReconciler: hardSet,
  whitelist: ['auth', 'config'],
  debug: import.meta.env.MODE === 'development',
  transforms: [
    encryptTransform({
      secretKey: '336205c57461932b98e543c228f236fb077', // Move and update this key in .env
      onError: function (error) {
        console.log('Critical Error Transforming Encrypted Data ==>', error);
      }
    })
  ]
};

export const store = configureStore({
  devTools: import.meta.env.MODE === 'development',
  reducer: {
    // Cast is needed due to a minor type mismatch between redux-persist and RTK reducer action types
    app: persistReducer(persistConfig, appReducer as any),
    [apiService.reducerPath]: apiService.reducer
  },
  middleware: gdm =>
    gdm({
      serializableCheck: false
    }).concat(apiService.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
