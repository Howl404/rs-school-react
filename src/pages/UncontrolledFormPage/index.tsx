import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from 'src/router/Router';
import * as yup from 'yup';

import { convertToBase64 } from 'utils/convertToBase64';
import { createUncontrolledFormSchema } from 'utils/createUncontrolledFormSchema';

import { FormErrorsState, dataActions } from 'store/data/dataSlice';
import { selectCountries } from 'store/selectors';
import { useAppDispatch } from 'store/store';

import AutoComplete from 'components/AutoComplete';
import PasswordStrength from 'components/PasswordStrength';

import styles from 'src/styles/Form.module.scss';

const initialErrorState: FormErrorsState = {
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

export function UncontrolledFormPage() {
  const [errors, setErrors] = useState(structuredClone(initialErrorState));

  const navigate = useNavigate();

  const countries = useSelector(selectCountries);

  const UncontrolledFormSchema = createUncontrolledFormSchema(countries);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const validatedInputs = await UncontrolledFormSchema.validate(
        formValues,
        {
          abortEarly: false,
        }
      );

      const pictureBase64 = await convertToBase64(validatedInputs.picture);

      const validatedInputsWithoutPicture = {
        ...validatedInputs,
        picture: undefined,
      };

      dispatch(
        dataActions.addUncontrolledSubmission({
          ...validatedInputsWithoutPicture,
          pictureBase64,
          isNew: true,
        })
      );

      navigate(Routes.Home);
    } catch (error) {
      const yupErrors = error as yup.ValidationError;

      const errorsObject = yupErrors.inner.reduce<FormErrorsState>(
        (acc, error) => {
          if (typeof error.path === 'string') {
            acc[error.path] = error.message;
          }
          return acc;
        },
        structuredClone(initialErrorState)
      );

      setErrors(errorsObject);
    }
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link to={Routes.Home}>Main page</Link>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" />
        </label>
        <p className={styles.error}>{errors.name}</p>

        <label htmlFor="age">
          Age
          <input type="number" name="age" id="age" />
        </label>
        <p className={styles.error}>{errors.age}</p>

        <label htmlFor="email">
          Email
          <input type="text" name="email" id="email" autoComplete="email" />
        </label>
        <p className={styles.error}>{errors.email}</p>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
          />
        </label>
        <PasswordStrength errorMessage={errors.password} />

        <label htmlFor="passwordConfirm">
          Password Confirm
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="new-password"
          />
        </label>
        <p className={styles.error}>{errors.passwordConfirm}</p>

        <label htmlFor="gender">
          Gender
          <select name="gender" id="gender" autoComplete="sex">
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <p className={styles.error}>{errors.gender}</p>

        <AutoComplete
          options={countries}
          label="Country"
          type="text"
          name="country"
        />
        <p className={styles.error}>{errors.country}</p>

        <label htmlFor="picture">
          Picture <input type="file" name="picture" id="picture" />
        </label>
        <p className={styles.error}>{errors.picture}</p>

        <label htmlFor="acceptedTC">
          Terms and conditions
          <input
            type="checkbox"
            name="acceptedTC"
            id="acceptedTC"
            value="true"
          />
        </label>
        <p className={styles.error}>{errors.acceptedTC}</p>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
