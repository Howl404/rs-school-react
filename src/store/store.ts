import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';
import productsReducer from './products/productsSlice';
import loadingReducer from './loading/loadingSlice';
import { apiService } from './api/api';

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
