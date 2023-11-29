import React from 'react';

import styles from './PasswordStrength.module.scss';

type PasswordStrengthProps = {
  errorMessage?: string;
};

const errorStyles: { [key: string]: string } = {
  'Password is required': 'weak',
  'Password must contain at least 8 characters': 'weak',
  'Password must contain at least one lowercase letter': 'weak',
  'Password must contain at least one uppercase letter': 'medium',
  'Password must contain at least one number': 'medium',
  'Password must contain at least one special character': 'strong',
};

export function PasswordStrength({ errorMessage }: PasswordStrengthProps) {
  if (!errorMessage) return;

  const styleKey = errorStyles[errorMessage];

  return <p className={styles[styleKey]}>{errorMessage}</p>;
}

export default React.memo(PasswordStrength);
