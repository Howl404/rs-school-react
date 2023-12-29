import { RootState } from 'store/index';

export const selectProductId = (state: RootState) =>
  state.products.selectedProductId;
