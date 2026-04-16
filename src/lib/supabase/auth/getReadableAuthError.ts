const getReadableAuthError = (errorMessage: string) => {
  const normalized = errorMessage.toLowerCase();

  if (
    normalized.includes('invalid login credentials') ||
    normalized.includes('invalid email or password')
  ) {
    return 'Invalid email or password. Please try again.';
  }

  if (normalized.includes('email not confirmed')) {
    return 'Please verify your email before signing in.';
  }

  if (normalized.includes('user already registered')) {
    return 'This email is already registered. Try signing in instead.';
  }

  if (normalized.includes('password should be at least 6 characters')) {
    return 'Password is too short. Use at least 6 characters.';
  }

  return errorMessage;
};

export default getReadableAuthError;
