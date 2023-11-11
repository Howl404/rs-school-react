import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { apiService } from 'store/api/api';
import { loadingReducer } from 'store/loading/loadingSlice';
import { productsReducer } from 'store/products/productsSlice';
import { searchReducer } from 'store/search/searchSlice';

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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
