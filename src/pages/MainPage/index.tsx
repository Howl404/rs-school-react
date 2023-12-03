import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes } from 'src/router/Router';

import { cls } from 'utils/cls';

import { FormStoreState, dataActions } from 'store/data/dataSlice';
import {
  selectHookFormSubmissions,
  selectUncontrolledSubmissions,
} from 'store/selectors';

import styles from './MainPage.module.scss';

function renderSubmissionsList(list: FormStoreState[]) {
  return list.map((submission) => (
    <div
      key={submission.name}
      className={cls(
        styles.submissionContainer,
        submission.isNew && styles.newSubmission
      )}
    >
      <p>Name: {submission.name}</p>
      <p>Age: {submission.age}</p>
      <p>Email: {submission.email}</p>
      <p>Password: {submission.password}</p>
      <p>Password Confirm: {submission.passwordConfirm}</p>
      <p>Gender: {submission.gender}</p>
      <p>Accepted T&C: {submission.acceptedTC ? 'true' : 'false'}</p>
      <p>Country: {submission.country}</p>
      <img src={submission.pictureBase64} alt="Uploaded image" />
    </div>
  ));
}

export function MainPage() {
  const dispatch = useDispatch();

  const uncontrolledSubmissions = useSelector(selectUncontrolledSubmissions);
  const hookFormSubmissions = useSelector(selectHookFormSubmissions);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(dataActions.markAllSubmissionsAsOld());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.submissionsContainer}>
        <div>
          <Link to={Routes.UncontrolledForm}>Uncontrolled form</Link>
          <h2>Uncontrolled form submissions</h2>
          <div className={styles.uncontrolledSubmissions}>
            {renderSubmissionsList(uncontrolledSubmissions)}
          </div>
        </div>
        <div>
          <Link to={Routes.HookForm}>Hook form</Link>
          <h2>Hook form submissions</h2>
          <div className={styles.hookFormSubmissions}>
            {renderSubmissionsList(hookFormSubmissions)}
          </div>
        </div>
      </div>
    </div>
  );
}