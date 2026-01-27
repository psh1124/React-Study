import Container from "../../../components/Container/Container";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import AuthCard from "../../../components/AuthCard/AuthCard";
import SignupForm from "./SignupForm";
import "../Auth.css";

function Signup() {
  return (
    <div className="auth-page">
      <Container>
        <AuthLayout variant="signup">
          <AuthCard>
            <h1 className="auth-title">회원가입</h1>
            <SignupForm />
          </AuthCard>
        </AuthLayout>
      </Container>
    </div>
  );
}

export default Signup;
