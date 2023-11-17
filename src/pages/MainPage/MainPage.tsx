import { Link } from 'react-router-dom';

import { useAppSelector } from 'store/store';

import styles from './MainPage.module.scss';

export default function MainPage() {
  const uncontrolledSubmissions = useAppSelector(
    (state) => state.data.uncontrolledSubmissions
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.submissionsContainer}>
        <div>
          <Link to={'/uncontrolled'}>Uncontrolled form</Link>
          <h2>Uncontrolled form submissions</h2>
          {uncontrolledSubmissions.map((submission) => (
            <div key={submission.name} className={styles.submissionContainer}>
              <p>Name: {submission.name}</p>
              <p>Age: {submission.age}</p>
              <p>Email: {submission.email}</p>
              <p>Password: {submission.password}</p>
              <p>Password Confirm: {submission.passwordConfirm}</p>
              <p>Gender: {submission.gender}</p>
              <p>Accepted T&C: {submission.acceptedTC ? 'true' : 'false'}</p>
              <p>Country: {submission.country}</p>
              <img src={submission.pictureBase64} alt="Uploaded" />
            </div>
          ))}
        </div>
        <div>
          <Link to={'/hookform'}>Hook form</Link>
          <h2>Hook form submissions</h2>
        </div>
      </div>
    </div>
  );
}
