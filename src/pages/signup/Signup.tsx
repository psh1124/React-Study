import Container from "../../components/Container/Container";
import AuthCard from "../../components/AuthCard/AuthCard";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <Container>
      <AuthCard>
        <h1>회원가입</h1>
        <SignupForm />
      </AuthCard>
    </Container>
  );
}

export default Signup;
