import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { updateSearchParams } from 'utils/updateSearchParams';

type ProductsState = {
  detailedProductId: string;
  viewMode: boolean;
};

const params = new URLSearchParams(window.location.search);

const initialState: ProductsState = {
  detailedProductId: params.get('productId') || '',
  viewMode: !!params.get('productId'),
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
  },
});

export const { setDetailedProductId, setViewMode } = productsSlice.actions;

export default productsSlice.reducer;
