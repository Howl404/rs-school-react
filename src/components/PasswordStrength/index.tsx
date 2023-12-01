import React from 'react';

import {
  PasswordErrorMessage,
  PasswordStrengthLevel,
} from 'enums/PasswordEnums';

import styles from './PasswordStrength.module.scss';

type PasswordStrengthProps = {
  errorMessage?: string;
};

const errorStyles: {
  [key in PasswordErrorMessage as string]: PasswordStrengthLevel;
} = {
  [PasswordErrorMessage.Required]: PasswordStrengthLevel.Weak,
  [PasswordErrorMessage.MinLength]: PasswordStrengthLevel.Weak,
  [PasswordErrorMessage.Lowercase]: PasswordStrengthLevel.Weak,
  [PasswordErrorMessage.Uppercase]: PasswordStrengthLevel.Medium,
  [PasswordErrorMessage.Number]: PasswordStrengthLevel.Medium,
  [PasswordErrorMessage.SpecialChar]: PasswordStrengthLevel.Strong,
};

export function PasswordStrength({ errorMessage }: PasswordStrengthProps) {
  if (!errorMessage) return;

  const styleKey = errorStyles[errorMessage];

  return <p className={styles[styleKey]}>{errorMessage}</p>;
}

export default React.memo(PasswordStrength);
