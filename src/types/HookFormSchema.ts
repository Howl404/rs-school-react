import * as yup from 'yup';

export const HookFormSchema = yup.object({
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
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')

    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character'
    ),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  acceptedTC: yup
    .boolean()
    .required()
    .isTrue('You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .required()
    .test('type', 'Picture is required', (value) => {
      const fileList = value as FileList;
      const file = fileList.item(0);
      return file ? file.size >= 1 : false;
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .png',
      (value) => {
        const fileList = value as FileList;
        const file = fileList.item(0);
        return file?.type === 'image/jpeg' || file?.type === 'image/png';
      }
    ),

  country: yup.string().required('Country is required'),
});
