import { FormEvent, useState } from 'react';
import * as yup from 'yup';

import { formSchema } from 'types/FormSchema';

type ErrorsState = {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  acceptedTC: string;
  image: string;
  country: string;
} & {
  [key: string]: string;
};

const initialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordConfirm: '',
  gender: '',
  acceptedTC: '',
  image: '',
  country: '',
};

export default function UncontrolledFormPage() {
  const [errors, setErrors] = useState<ErrorsState>(
    structuredClone(initialState)
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    console.log(event.target);

    setErrors(structuredClone(initialState));

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    try {
      await formSchema.validate(formValues, { abortEarly: false });
      console.log('success');
    } catch (error) {
      const yupErrors = error as yup.ValidationError;

      const errorsObject = yupErrors.inner.reduce<ErrorsState>((acc, error) => {
        if (typeof error.path === 'string') {
          acc[error.path] = error.message;
        }
        return acc;
      }, structuredClone(initialState));

      setErrors(errorsObject);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      {errors.name && <p className="error">{errors.name}</p>}
      <input type="file" name="image" id="image" />
      {errors.image && <p className="error">{errors.image}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
