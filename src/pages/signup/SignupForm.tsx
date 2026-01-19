import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.length > 0 && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`로그인 시도: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField
        id="email"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={!isValid}>
        회원가입
      </Button>
    </form>
  );
}

export default SignupForm;
