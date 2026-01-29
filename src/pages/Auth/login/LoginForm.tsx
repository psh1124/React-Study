import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button/Button";
import PasswordField from "../../../components/PasswordField/PasswordField";
import AuthField from "../../../components/AuthField/AuthField"; // 추가됨
import {
  getEmailError,
  getPasswordError,
  validateLoginForm,
} from "../../../hooks/useAuthValidation";
import { useAuth } from "../../../context/useAuth";
import { mockLogin } from "../../../mocks/auth";
import { useLoading } from "../../../context/useLoading";
import "../Auth.css";

function LoginForm() {
  const { setLoading } = useLoading();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const errors = {
    email: getEmailError(formData.email, touched.email),
    password: getPasswordError(formData.password, touched.password),
  };

  const isFormValid = validateLoginForm(formData.email, formData.password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await mockLogin(formData.email, formData.password);
      login(user);
      toast.success(`${user.nickname}님 반갑습니다! 😊`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="auth-form__fields">
        <AuthField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          className="email-input"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
        />

        <PasswordField
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
        />
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
