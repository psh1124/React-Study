import { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import {
  getEmailError,
  getPasswordError,
  getPasswordConfirmError,
  getNicknameError,
  getTermsError,
  validateSignupForm,
} from "../../../hooks/useAuthValidation";
import "../Auth.css";
import { IoIosWarning } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { mockSignup } from "../../../mocks/auth";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../../../constants/messages";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";

function SignupForm() {
  const {
    isVisible: isPwdVisible,
    toggle: togglePwd,
    type: pwdType,
  } = usePasswordToggle();
  const {
    isVisible: isConfirmVisible,
    toggle: toggleConfirm,
    type: confirmType,
  } = usePasswordToggle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsTouched, setTermsTouched] = useState(false);

  const signupData = {
    nickname,
    email,
    password,
    passwordConfirm,
    agreeTerms,
  };

  const navigate = useNavigate();

  const emailError = getEmailError(email, emailTouched);
  const passwordError = getPasswordError(password, passwordTouched);
  const passwordConfirmError = getPasswordConfirmError(
    password,
    passwordConfirm,
    passwordConfirmTouched,
  );

  const nicknameError = getNicknameError(nickname, nicknameTouched);
  const termsError = getTermsError(agreeTerms, termsTouched);

  const isFormValid = validateSignupForm(
    nickname,
    email,
    password,
    passwordConfirm,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.warn("입력 양식을 다시 확인해주세요.");
      return;
    }

    try {
      const user = await mockSignup(email, password, nickname);
      toast.success(`${user.nickname}님, ${AUTH_MESSAGES.SIGNUP_SUCCESS}`);
      console.log("signup data:", signupData);
      navigate("../login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__fields">
        <div className="auth-form__field">
          <label htmlFor="nickname">닉네임</label>
          <InputField
            id="nickname"
            name="nickname"
            className="nickname-input"
            type="text"
            autoComplete="username"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => setNicknameTouched(true)}
          />
          {nicknameError && (
            <p className="error">
              <IoIosWarning /> {nicknameError}
            </p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="email">이메일</label>
          <InputField
            id="email"
            name="email"
            className="email-input"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && (
            <p className="error">
              <IoIosWarning /> {emailError}
            </p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="password">비밀번호</label>
          <div className="password-wrapper">
            <InputField
              id="password"
              name="password"
              className="password-input"
              type={pwdType}
              placeholder="비밀번호를 입력하세요"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePwd}>
              {isPwdVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {passwordError && (
            <p className="error">
              <IoIosWarning /> {passwordError}
            </p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <div className="password-wrapper">
            <InputField
              id="passwordConfirm"
              name="passwordConfirm"
              className="password-input"
              type={confirmType}
              placeholder="비밀번호를 다시 입력하세요"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={() => setPasswordConfirmTouched(true)}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={
                isConfirmVisible ? "비밀번호 숨기기" : "비밀번호 보기"
              }
              onClick={toggleConfirm}>
              {isConfirmVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {passwordConfirmError && (
            <p className="error">
              <IoIosWarning /> {passwordConfirmError}
            </p>
          )}
        </div>
      </div>

      <div className="auth-form__field">
        <label htmlFor="agreeTerms" className="terms-checkbox">
          <input
            id="agreeTerms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              setTermsTouched(true);
            }}
          />
          <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
        </label>

        {termsError && (
          <p className="error">
            <IoIosWarning /> {termsError}
          </p>
        )}
      </div>

      <div className="auth-form__actions">
        <Button type="submit" disabled={!isFormValid}>
          회원가입
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
