import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from 'src/router/Router';
import { InferType } from 'yup';

import { convertToBase64 } from 'utils/convertToBase64';
import { createHookFormSchema } from 'utils/createHookFormSchema';

import { dataActions } from 'store/data/dataSlice';
import { selectCountries } from 'store/selectors';
import { useAppDispatch } from 'store/store';

import AutoComplete from 'components/AutoComplete';
import PasswordStrength from 'components/PasswordStrength';

import styles from 'src/styles/Form.module.scss';

export function HookFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const countries = useSelector(selectCountries);

  const HookFormSchema = createHookFormSchema(countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(HookFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<InferType<typeof HookFormSchema>> = async (
    data
  ) => {
    const picture = data.picturesList[0];

    const pictureBase64 = await convertToBase64(picture);

    const validatedDataWithoutPicture = {
      ...data,
      picturesList: undefined,
    };

    dispatch(
      dataActions.addHookFormSubmission({
        ...validatedDataWithoutPicture,
        pictureBase64,
        isNew: true,
      })
    );

    navigate(Routes.Home);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Link to={Routes.Home}>Main page</Link>
        <label htmlFor="name">
          Name
          <input type="text" {...register('name')} />
        </label>
        <p className={styles.error}>{errors.name?.message}</p>

        <label htmlFor="age">
          Age
          <input type="number" {...register('age')} />
        </label>
        <p className={styles.error}>{errors.age?.message}</p>

        <label htmlFor="email">
          Email
          <input type="text" {...register('email')} autoComplete="email" />
        </label>
        <p className={styles.error}>{errors.email?.message}</p>

        <label htmlFor="password">
          Password
          <input
            type="password"
            {...register('password')}
            autoComplete="new-password"
          />
        </label>
        <PasswordStrength errorMessage={errors.password?.message} />

        <label htmlFor="passwordConfirm">
          Password Confirm
          <input
            type="password"
            {...register('passwordConfirm')}
            autoComplete="new-password"
          />
        </label>
        <p className={styles.error}>{errors.passwordConfirm?.message}</p>

        <label htmlFor="gender">
          Gender
          <select {...register('gender')} autoComplete="sex">
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <p className={styles.error}>{errors.gender?.message}</p>

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange } }) => (
            <AutoComplete
              options={countries}
              label="Country"
              name="country"
              onChange={onChange}
              type="text"
            />
          )}
        />
        <p className={styles.error}>{errors.country?.message}</p>

        <label htmlFor="picture">
          Picture
          <input type="file" {...register('picturesList')} />
        </label>
        <p className={styles.error}>{errors.picturesList?.message}</p>

        <label htmlFor="acceptedTC">
          Terms and conditions
          <input type="checkbox" {...register('acceptedTC')} value="true" />
        </label>
        <p className={styles.error}>{errors.acceptedTC?.message}</p>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
