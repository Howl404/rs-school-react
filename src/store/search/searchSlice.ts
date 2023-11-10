import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { updateSearchParams } from 'src/utils/updateSearchParams';

type SearchState = {
  searchTerm: string;
  perPage: string;
  page: number;
};

const params = new URLSearchParams(window.location.search);

const initialState: SearchState = {
  searchTerm: localStorage.getItem('howl-searchTerm') || '',
  perPage: params.get('perPage') || '10',
  page: Number(params.get('page')) || 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorage.setItem('howl-searchTerm', action.payload);
    },
    setPerPage: (state, action: PayloadAction<string>) => {
      state.perPage = action.payload;
      updateSearchParams('perPage', action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      updateSearchParams('page', action.payload.toString());
    },
  },
});

export const { setSearchTerm, setPerPage, setPage } = searchSlice.actions;

export default searchSlice.reducer;
