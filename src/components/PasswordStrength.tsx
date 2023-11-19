import styles from './PasswordStrength.module.scss';

const errorStyles: { [key: string]: string } = {
  'Password is required': 'weak',
  'Password must contain at least 8 characters': 'weak',
  'Password must contain at least one uppercase letter': 'weak',
  'Password must contain at least one lowercase letter': 'medium',
  'Password must contain at least one number': 'medium',
  'Password must contain at least one special character': 'strong',
};

export default function PasswordStrength({
  errorMessage,
}: {
  errorMessage: string;
}) {
  if (!errorMessage) return;

  const styleKey = errorStyles[errorMessage];

  return (
    <p className={styleKey ? styles[styleKey] : styles.error}>{errorMessage}</p>
  );
}
