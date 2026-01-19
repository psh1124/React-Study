import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;

  const isFormValid = isEmailValid && isPasswordValid;

  const getEmailError = () => {
    if (!emailTouched) return null;
    if (email.length === 0) return "이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "이메일 형식이 올바르지 않습니다.";
    return null;
  };
  const emailError = getEmailError();

  const getPasswordError = () => {
    if (!passwordTouched) return null;
    if (password.length === 0) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호는 8자리 이상입니다.";
    return null;
  };
  const passwordError = getPasswordError();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email : ", email);
    console.log("password : ", password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-form__fields">
        <div className="login-form__field">
          <label htmlFor="email">이메일</label>
          <InputField
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        <div className="login-form__field">
          <label htmlFor="password">비밀번호</label>
          <InputField
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
      </div>

      <Button type="submit" disabled={!isFormValid}>
        로그인
      </Button>

      <p className="signup-link">
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );
}

export default LoginForm;
