import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { getEmailError, getPasswordError } from "../../hooks/useAuthValidation";
import "./LoginForm.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { useAuth } from "../../context/useAuth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailError = getEmailError(email, emailTouched);
  const passwordError = getPasswordError(password, passwordTouched);
  const isFormValid = !emailError && !passwordError;

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
    type: showPassword ? "text" : "password",
    autoComplete: "current-password",
    placeholder: "비밀번호를 입력하세요",
    value: password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
    onBlur: () => setPasswordTouched(true),
  };

  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    login({
      email
    })

    console.log("email : ", email);
    console.log("password : ", password);

    //추후 백엔드 로직 추가

    alert(`${email}님 반갑습니다!`)
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div className="login-form__fields">
        <div className="login-form__field">
          <label htmlFor="email">이메일</label>
          <InputField
            className="email-input" {...emailInputProps}
          />
          {emailError && (
            <p className="error">
              <IoIosWarning /> {emailError}
            </p>
          )}
        </div>

        <div className="login-form__field">
          <label htmlFor="password">비밀번호</label>
          <div className="password-wrapper">
            <InputField
              className="password-input" {...passwordInputProps}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

          {passwordError && (
            <p className="error">
              <IoIosWarning /> {passwordError}
            </p>
          )}
        </div>
      </div>

      <div className="login-form__actions">
        <Button type="submit" disabled={!isFormValid}>
          로그인
        </Button>
      </div>

      <p className="signup-link">
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );
}

export default LoginForm;
