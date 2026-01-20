import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { getEmailError, getPasswordError } from "../../hooks/useAuthValidation";
import "./LoginForm.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
            id="email"
            name="email"
            className="email-input"
            type="email"
            autocomplete="email"
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

        <div className="login-form__field">
          <label htmlFor="password">비밀번호</label>

          <div className="password-wrapper">
            <InputField
              id="password"
              name="password"
              className="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              autocomplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />

            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
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
