import { RootState } from './store';

export const selectCountries = (state: RootState) => state.data.countries;
export const selectUncontrolledSubmissions = (state: RootState) =>
  state.data.uncontrolledSubmissions;
export const selectHookFormSubmissions = (state: RootState) =>
  state.data.hookFormSubmissions;
