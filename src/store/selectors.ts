import { RootState } from 'store/store';

export const selectDetailedProductId = (state: RootState) =>
  state.products.detailedProductId;
export const selectMainPageIsLoading = (state: RootState) =>
  state.products.mainPageIsLoading;
export const selectDetailsPageIsLoading = (state: RootState) =>
  state.products.detailsPageIsLoading;

export const selectPage = (state: RootState) => state.search.page;
export const selectPerPage = (state: RootState) => state.search.perPage;
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
