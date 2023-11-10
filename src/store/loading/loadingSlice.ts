import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    mainPageIsLoading: false,
    detailsPageIsLoading: false,
  },
  reducers: {
    setMainPageLoading: (state, action) => {
      state.mainPageIsLoading = action.payload;
    },
    setDetailsPageLoading: (state, action) => {
      state.detailsPageIsLoading = action.payload;
    },
  },
});

export const { setMainPageLoading, setDetailsPageLoading } =
  loadingSlice.actions;

export default loadingSlice.reducer;
