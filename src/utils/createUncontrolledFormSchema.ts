import * as yup from 'yup';

import { PasswordErrorMessage } from 'enums/PasswordEnums';

export const createUncontrolledFormSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'Name must start with a capital letter')
      .required('Name is required'),
    age: yup
      .number()
      .positive('Age must be a positive number')
      .typeError('Age is required')
      .required(),
    gender: yup.string().required('Gender is required'),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email is not valid'
      )
      .required('Email is required'),
    password: yup
      .string()
      .matches(/[@$!%*?&]/, PasswordErrorMessage.SpecialChar)
      .matches(/[0-9]/, PasswordErrorMessage.Number)
      .matches(/[A-Z]/, PasswordErrorMessage.Uppercase)
      .matches(/[a-z]/, PasswordErrorMessage.Lowercase)
      .min(8, PasswordErrorMessage.MinLength)
      .required(PasswordErrorMessage.Required),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
    acceptedTC: yup
      .boolean()
      .required('You must accept the terms and conditions'),
    picture: yup
      .mixed<File>()
      .test(
        'fileType',
        'Only the following formats are accepted: .jpeg, .png',
        (value) =>
          value && (value.type === 'image/jpeg' || value.type === 'image/png')
      )
      .test(
        'fileSize',
        'Picture is required',
        (value) => value && value.size >= 1
      )
      .required(),
    country: yup
      .string()
      .required('Country is required')
      .oneOf(countries, 'Country is not valid'),
  });
