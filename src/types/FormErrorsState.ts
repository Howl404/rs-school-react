export type FormErrorsState = {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  acceptedTC: string;
  picture: string;
  country: string;
} & {
  [key: string]: string;
};
