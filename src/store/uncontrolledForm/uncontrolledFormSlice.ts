import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormStoreState } from 'src/types/FormStoreState';

export const initialFormState: FormStoreState = {
  name: '',
  age: 0,
  gender: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptedTC: false,
  pictureBase64: '',
  country: '',
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState: initialFormState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormStoreState>) => {
      state = action.payload;
    },
  },
});

export const {
  reducer: uncontrolledFormReducer,
  actions: uncontrolledFormActions,
} = uncontrolledFormSlice;
