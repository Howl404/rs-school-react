import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    selectedProductId: -1,
  },
  reducers: {
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  productsSlice;
