import * as yup from 'yup';

export const formSchema = yup.object({
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
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character'
    )
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .min(8, 'Password must contain at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  acceptedTC: yup
    .boolean()
    .required('You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .png',
      (value) => {
        const file = value as File;
        return (
          file && (file.type === 'image/jpeg' || file.type === 'image/png')
        );
      }
    )
    .test('type', 'Picture is required', (value) => {
      const file = value as File;
      return file && file.size >= 1;
    })
    .required(),
  country: yup.string().required('Country is required'),
});
