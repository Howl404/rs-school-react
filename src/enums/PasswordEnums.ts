export enum PasswordStrengthLevel {
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong',
}

export enum PasswordErrorMessage {
  Required = 'Password is required',
  MinLength = 'Password must contain at least 8 characters',
  Lowercase = 'Password must contain at least one lowercase letter',
  Uppercase = 'Password must contain at least one uppercase letter',
  Number = 'Password must contain at least one number',
  SpecialChar = 'Password must contain at least one special character',
}
