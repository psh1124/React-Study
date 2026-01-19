import Container from "../../components/Container/Container";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthCard from "../../components/AuthCard/AuthCard";
import LoginForm from "./LoginForm";
import "./Login.css";
import { useEffect } from "react";

function Login() {
  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [])

  return (
    <div className="login-page">
      <Container>
        <AuthLayout align="center" variant="login">
          <AuthCard>
            <h1 className="login-title">로그인</h1>
            <LoginForm />
          </AuthCard>
        </AuthLayout>
      </Container>
    </div>
  );
}

export default Login;
