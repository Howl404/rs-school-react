import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number'),
  gender: yup.string().required('Gender is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
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
    .required('You must accept the terms and conditions'),
  image: yup
    .mixed()
    .required('Picture is required')
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .png',
      (value) => {
        const file = value as File;
        return (
          file && (file.type === 'image/jpeg' || file.type === 'image/png')
        );
      }
    ),
  country: yup.string().required('Country is required'),
});
