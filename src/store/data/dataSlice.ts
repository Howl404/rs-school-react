import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FormStoreState = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  acceptedTC: boolean;
  pictureBase64: string;
  country: string;
};

export type FormErrorsState = {
  [Property in keyof Omit<FormStoreState, 'pictureBase64'>]: string;
} & {
  picture: string;
} & {
  [key: string]: string;
};

type DataSliceState = {
  countries: string[];
  uncontrolledSubmissions: FormStoreState[];
  hookFormSubmissions: FormStoreState[];
};

const initialState: DataSliceState = {
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
  uncontrolledSubmissions: [],
  hookFormSubmissions: [],
};

const dataSlice = createSlice({
  name: 'dataForm',
  initialState,
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
