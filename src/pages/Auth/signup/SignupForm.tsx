import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button/Button";
import PasswordField from "../../../components/PasswordField/PasswordField";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import {
  getEmailError,
  getPasswordError,
  getPasswordConfirmError,
  getNicknameError,
  getTermsError,
  validateSignupForm,
} from "../../../hooks/useAuthValidation";
import { mockCheckEmail, mockSignup } from "../../../mocks/auth";
import { AUTH_MESSAGES } from "../../../constants/messages";
import "../Auth.css";
import AuthField from "../../../components/AuthField/AuthField";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

function SignupForm() {
  const [isSignupLoading, setisSignupLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    agreeTerms: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    nickname: false,
    email: false,
    password: false,
    passwordConfirm: false,
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const isEmailDuplicated = emailCheckMessage.includes("이미");

  const handleEmailBlur = async () => {
    handleBlur("email");

    const email = formData.email;
    if (!email || getEmailError(email, true)) {
      setEmailCheckMessage("");
      return;
    }

    try {
      const isDuplicated = await mockCheckEmail(email);

      if (isDuplicated) {
        setEmailCheckMessage("이미 사용 중인 이메일입니다.");
      } else {
        setEmailCheckMessage("사용 가능한 이메일입니다.");
      }
    } catch {
      setEmailCheckMessage("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const errors = {
    nickname: getNicknameError(formData.nickname, touched.nickname),
    email: getEmailError(formData.email, touched.email),
    password: getPasswordError(formData.password, touched.password),
    passwordConfirm: getPasswordConfirmError(
      formData.password,
      formData.passwordConfirm,
      touched.passwordConfirm,
    ),
    terms: getTermsError(formData.agreeTerms, touched.agreeTerms),
  };

  const isFormValid =
    validateSignupForm(
      formData.nickname,
      formData.email,
      formData.password,
      formData.passwordConfirm,
      formData.agreeTerms,
    ) && !isEmailDuplicated;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.warn("입력 양식을 다시 확인해주세요.");
      return;
    }

    setisSignupLoading(true);
    try {
      const user = await mockSignup(
        formData.email,
        formData.password,
        formData.nickname,
      );
      toast.success(`${user.nickname}님, ${AUTH_MESSAGES.SIGNUP_SUCCESS}`);
      navigate("../login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      toast.error(errorMessage);
    } finally {
      setisSignupLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {isSignupLoading && <LoadingOverlay />}
      <div className="auth-form__fields">
        <AuthField
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          className="nickname-input"
          value={formData.nickname}
          error={errors.nickname}
          disabled={isSignupLoading}
          onChange={handleChange}
          onBlur={() => handleBlur("nickname")}
        />

        <AuthField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          className="email-input"
          autoComplete="email"
          value={formData.email}
          error={errors.email || (isEmailDuplicated ? emailCheckMessage : null)}
          successMessage={
            !errors.email && !isEmailDuplicated ? emailCheckMessage : null
          }
          disabled={isSignupLoading}
          onChange={(e) => {
            handleChange(e);
            setEmailCheckMessage("");
          }}
          onBlur={handleEmailBlur}
        />

        <PasswordField
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          value={formData.password}
          error={errors.password}
          disabled={isSignupLoading}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
        />

        <PasswordField
          id="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          value={formData.passwordConfirm}
          error={errors.passwordConfirm}
          disabled={isSignupLoading}
          onChange={handleChange}
          onBlur={() => handleBlur("passwordConfirm")}
        />
      </div>

      <div className="auth-form__field">
        <label htmlFor="agreeTerms" className="terms-checkbox">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            disabled={isSignupLoading}
            onChange={handleChange}
          />
          <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
        </label>
        {errors.terms && <ErrorMessage message={errors.terms} />}
      </div>

      <div className="auth-form__actions">
        <Button
          type="submit"
          loading={isSignupLoading}
          disabled={!isFormValid || isSignupLoading}>
          회원가입
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
