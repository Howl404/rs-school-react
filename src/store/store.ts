import { configureStore } from '@reduxjs/toolkit';

import { apiService } from './api/api';
import loadingReducer from './loading/loadingSlice';
import productsReducer from './products/productsSlice';
import searchReducer from './search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer,
    loading: loadingReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
