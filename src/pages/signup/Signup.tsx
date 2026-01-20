import Container from "../../components/Container/Container";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthCard from "../../components/AuthCard/AuthCard";
import SignupForm from "./SignupForm";
import './Signup.css'

function Signup() {
  return (
    <div className="signup-page">
      <Container>
        <AuthLayout align="center" variant="signup">
          <AuthCard>
            <h1 className="signup-title">회원가입</h1>
            <SignupForm />
          </AuthCard>
        </AuthLayout>
      </Container>
    </div>
  );
}

export default Signup;
