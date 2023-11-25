import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { InferType } from 'yup';

import { convertToBase64 } from 'utils/convertToBase64';

import { dataActions } from 'store/data/dataSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import { HookFormSchema } from 'types/HookFormSchema';

import PasswordStrength from 'components/PasswordStrength';

import styles from 'src/styles/Form.module.scss';

export function HookFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.data.countries);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(HookFormSchema),
    mode: 'onChange',
  });

  const errors = formState.errors;

  const onSubmit: SubmitHandler<InferType<typeof HookFormSchema>> = async (
    data
  ) => {
    const filesList = data.picture as FileList;
    const picture = filesList.item(0);

    const pictureBase64 = await convertToBase64(picture as Blob);

    dispatch(
      dataActions.addHookFormSubmission({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        gender: data.gender,
        acceptedTC: data.acceptedTC,
        pictureBase64: pictureBase64,
        country: data.country,
      })
    );

    navigate('/');
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Link to={'/'}>Main page</Link>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name')} />
        </div>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <div>
          <label htmlFor="age">Age</label>
          <input type="number" {...register('age')} />
        </div>
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" {...register('email')} autoComplete="email" />
        </div>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password')}
            autoComplete="new-password"
          />
        </div>
        {errors.password && (
          <PasswordStrength errorMessage={errors.password.message} />
        )}

        <div>
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            type="password"
            {...register('passwordConfirm')}
            autoComplete="new-password"
          />
        </div>
        {errors.passwordConfirm && (
          <p className={styles.error}>{errors.passwordConfirm.message}</p>
        )}

        <div>
          <label htmlFor="gender">Gender</label>
          <select {...register('gender')} autoComplete="sex">
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}

        <label htmlFor="acceptedTC">
          Terms and conditions
          <input type="checkbox" {...register('acceptedTC')} value="true" />
        </label>
        {errors.acceptedTC && (
          <p className={styles.error}>{errors.acceptedTC.message}</p>
        )}

        <div>
          <label htmlFor="country">Country</label>
          <select {...register('country')} autoComplete="country-name">
            <option value="">Select country...</option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {errors.country && (
          <p className={styles.error}>{errors.country.message}</p>
        )}

        <div>
          <label htmlFor="picture">Picture</label>
          <input type="file" {...register('picture')} />
        </div>
        {errors.picture && (
          <p className={styles.error}>{errors.picture.message}</p>
        )}

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
