import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { dataActions } from 'store/data/dataSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import { formSchema } from 'types/FormSchema';

import styles from './UncontrolledFormPage.module.scss';

type ErrorsState = {
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

const initialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordConfirm: '',
  gender: '',
  acceptedTC: '',
  picture: '',
  country: '',
};

const convertToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function UncontrolledFormPage() {
  const [errors, setErrors] = useState<ErrorsState>(
    structuredClone(initialState)
  );

  const navigate = useNavigate();

  const countries = useAppSelector((state) => state.data.countries);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    setErrors(structuredClone(initialState));

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const validatedInputs = await formSchema.validate(formValues, {
        abortEarly: false,
      });

      const pictureBase64 = await convertToBase64(
        validatedInputs.picture as Blob
      );

      dispatch(
        dataActions.addUncontrolledSubmission({
          name: validatedInputs.name,
          age: validatedInputs.age,
          email: validatedInputs.email,
          password: validatedInputs.password,
          passwordConfirm: validatedInputs.passwordConfirm,
          gender: validatedInputs.gender,
          acceptedTC: validatedInputs.acceptedTC,
          pictureBase64: pictureBase64,
          country: validatedInputs.country,
        })
      );

      navigate('/');
    } catch (error) {
      const yupErrors = error as yup.ValidationError;

      console.log(yupErrors);

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
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link to={'/'}>Main page</Link>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <div>
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" />
        </div>
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" autoComplete="email" />
        </div>
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
          />
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <div>
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="new-password"
          />
        </div>
        {errors.passwordConfirm && (
          <p className={styles.error}>{errors.passwordConfirm}</p>
        )}

        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" autoComplete="sex">
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}

        <label htmlFor="acceptedTC">
          Terms and conditions
          <input
            type="checkbox"
            name="acceptedTC"
            id="acceptedTC"
            value="true"
          />
        </label>
        {errors.acceptedTC && (
          <p className={styles.error}>{errors.acceptedTC}</p>
        )}

        <div>
          <label htmlFor="country">Country</label>
          <select name="country" id="country" autoComplete="country-name">
            <option value="">Select country...</option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {errors.country && <p className={styles.error}>{errors.country}</p>}

        <div>
          <label htmlFor="picture">Picture</label>
          <input type="file" name="picture" id="picture" />
        </div>
        {errors.picture && <p className={styles.error}>{errors.picture}</p>}

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
