import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { updateSearchParams } from 'utils/updateSearchParams';

type ProductsState = {
  detailedProductId: string;
  viewMode: boolean;
  mainPageIsLoading: boolean;
  detailsPageIsLoading: boolean;
};

const params = new URLSearchParams(window.location.search);

const initialState: ProductsState = {
  detailedProductId: params.get('productId') || '',
  viewMode: !!params.get('productId'),
  mainPageIsLoading: false,
  detailsPageIsLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setDetailedProductId: (state, action: PayloadAction<string>) => {
      state.detailedProductId = action.payload;
      updateSearchParams('productId', action.payload);
    },
    setViewMode: (state, action: PayloadAction<boolean>) => {
      state.viewMode = action.payload;
    },
    setIsMainPageLoading: (state, action) => {
      state.mainPageIsLoading = action.payload;
    },
    setIsDetailsPageLoading: (state, action) => {
      state.detailsPageIsLoading = action.payload;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  productsSlice;
