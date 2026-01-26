import Container from "../../../components/Container/Container";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import AuthCard from "../../../components/AuthCard/AuthCard";
import LoginForm from "./LoginForm";
import "../Auth.css";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="auth-page">
      <Container>
        <AuthLayout align="center" variant="login">
          <AuthCard>
            <h1 className="auth-title">로그인</h1>
            <LoginForm />
          </AuthCard>
        </AuthLayout>
      </Container>
    </div>
  );
}

export default Login;
