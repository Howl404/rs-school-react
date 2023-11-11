import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    mainPageIsLoading: false,
    detailsPageIsLoading: false,
  },
  reducers: {
    setIsMainPageLoading: (state, action) => {
      state.mainPageIsLoading = action.payload;
    },
    setIsDetailsPageLoading: (state, action) => {
      state.detailsPageIsLoading = action.payload;
    },
  },
});

export const { reducer: loadingReducer, actions: loadingActions } =
  loadingSlice;
