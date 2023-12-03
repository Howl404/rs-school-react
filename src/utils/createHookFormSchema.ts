import * as yup from 'yup';

import { PasswordErrorMessage } from 'enums/PasswordEnums';

export const createHookFormSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z]/, 'Name must start with a capital letter'),
    age: yup
      .number()
      .required()
      .typeError('Age is required')
      .positive('Age must be a positive number'),
    gender: yup.string().required('Gender is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email is not valid'
      ),
    password: yup
      .string()
      .required(PasswordErrorMessage.Required)
      .min(8, PasswordErrorMessage.MinLength)
      .matches(/[a-z]/, PasswordErrorMessage.Lowercase)
      .matches(/[A-Z]/, PasswordErrorMessage.Uppercase)

      .matches(/[0-9]/, PasswordErrorMessage.Number)
      .matches(/[@$!%*?&]/, PasswordErrorMessage.SpecialChar),
    passwordConfirm: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    acceptedTC: yup
      .boolean()
      .required()
      .isTrue('You must accept the terms and conditions'),
    picturesList: yup
      .mixed<FileList>()
      .required()
      .test('fileSize', 'Picture is required', (value) => {
        const file = value.item(0);
        return file ? file.size >= 1 : false;
      })
      .test(
        'fileType',
        'Only the following formats are accepted: .jpeg, .png',
        (value) => {
          const file = value.item(0);
          return file?.type === 'image/jpeg' || file?.type === 'image/png';
        }
      ),

    country: yup
      .string()
      .required('Country is required')
      .oneOf(countries, 'Country is not valid'),
  });
