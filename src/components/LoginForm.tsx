import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email && password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`로그인 시도: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
}

export default LoginForm;
