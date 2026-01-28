import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import {
  getEmailError,
  getPasswordError,
  validateLoginForm,
} from "../../../hooks/useAuthValidation";
import "../Auth.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { useAuth } from "../../../context/useAuth";
import { mockLogin } from "../../../mocks/auth";
import { toast } from "react-toastify";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";
import { useLoading } from "../../../context/useLoading";

function LoginForm() {
  const { setLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { isVisible, toggle, type } = usePasswordToggle();

  const emailError = getEmailError(email, emailTouched);
  const passwordError = getPasswordError(password, passwordTouched);
  const isFormValid = validateLoginForm(email, password);

  const emailInputProps = {
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "이메일을 입력하세요",
    value: email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
    onBlur: () => setEmailTouched(true),
  };
  const passwordInputProps = {
    id: "password",
    name: "password",
    type: type,
    autoComplete: "current-password",
    placeholder: "비밀번호를 입력하세요",
    value: password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
    onBlur: () => setPasswordTouched(true),
  };

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = await mockLogin(email, password);
      login(user);
      toast.success(`${user.nickname}님 반갑습니다! 😊`, {
        toastId: "login-success",
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="auth-form__fields">
        <div className="auth-form__field">
          <label htmlFor="email">이메일</label>
          <InputField className="email-input" {...emailInputProps} />
          {emailError && (
            <p className="error">
              <IoIosWarning /> {emailError}
            </p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="password">비밀번호</label>
          <div className="password-wrapper">
            <InputField className="password-input" {...passwordInputProps} />
            <button type="button" className="password-toggle" onClick={toggle}>
              {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

          {passwordError && (
            <p className="error">
              <IoIosWarning /> {passwordError}
            </p>
          )}
        </div>
      </div>

      <div className="auth-form__actions">
        <Button type="submit" disabled={!isFormValid}>
          로그인
        </Button>
      </div>

      <p className="auth-footer-link">
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );
}

export default LoginForm;
