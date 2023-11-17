import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormStoreState } from 'src/types/FormStoreState';

const dataSlice = createSlice({
  name: 'dataForm',
  initialState: {
    countries: [
      'United States',
      'Canada',
      'France',
      'Germany',
      'Russia',
      'Belarus',
      'Georgia',
      'Lithuania',
      'United Kingdom',
      'Ireland',
    ],
    uncontrolledSubmissions: [] as FormStoreState[],
    hookFormSubmissions: [] as FormStoreState[],
  },
  reducers: {
    addUncontrolledSubmission: (
      state,
      action: PayloadAction<FormStoreState>
    ) => {
      state.uncontrolledSubmissions.push(action.payload);
    },
    addHookFormSubmission: (state, action: PayloadAction<FormStoreState>) => {
      state.hookFormSubmissions.push(action.payload);
    },
  },
});

export const { reducer: dataReducer, actions: dataActions } = dataSlice;
