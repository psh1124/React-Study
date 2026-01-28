export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getNicknameError = (
  nickname: string,
  touched: boolean,
): string | null => {
  if (!touched) return null;
  if (!nickname) return "닉네임을 입력해주세요.";
  return null;
};

export const getEmailError = (
  email: string,
  touched: boolean,
): string | null => {
  if (!touched) return null;
  if (!email) return "이메일을 입력해주세요.";
  if (!emailRegex.test(email)) return "이메일 형식이 올바르지 않습니다.";
  return null;
};

export const getPasswordError = (
  password: string,
  touched: boolean,
  minLength = 8,
): string | null => {
  if (!touched) return null;
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < minLength)
    return `비밀번호는 ${minLength}자리 이상입니다.`;
  return null;
};

export const getPasswordConfirmError = (
  password: string,
  passwordConfirm: string,
  touched: boolean,
): string | null => {
  if (!touched) return null;
  if (!passwordConfirm) return "비밀번호 확인을 입력해주세요.";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return null;
};

export const getTermsError = (
  agreed: boolean,
  touched: boolean,
): string | null => {
  if (!touched) return null;
  if (!agreed) return "약관에 동의해주세요.";
  return null;
};

export const validateLoginForm = (email: string, password: string) => {
  return !getEmailError(email, true) && !getPasswordError(password, true);
};

export const validateSignupForm = (
  nickname: string,
  email: string,
  password: string,
  passwordConfirm: string,
  agreeTerms: boolean
) => {
  return (
    !getNicknameError(nickname, true) &&
    !getEmailError(email, true) &&
    !getPasswordError(password, true) &&
    !getPasswordConfirmError(password, passwordConfirm, true) &&
    agreeTerms
  );
};
