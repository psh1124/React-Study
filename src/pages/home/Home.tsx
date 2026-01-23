import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { useAuth } from "../../context/useAuth";

function Home() {
  const { user, isLoggedIn } = useAuth();
  console.log(user);

  return (
    <Container>
      <h1>Home Page</h1>

      {isLoggedIn && user && (
        <p>{user.nickname}님 환영합니다.</p>
      )}

      <div>
        <Card title="섹션 1" content="내용 예시 1" section="섹션 1"></Card>
        <Card title="섹션 2" content="내용 예시 2" section="섹션 2"></Card>
        <Card title="섹션 3" content="내용 예시 3" section="섹션 3"></Card>
        <Card title="섹션 4" content="내용 예시 4" section="섹션 4"></Card>
        <Card title="섹션 5" content="내용 예시 5" section="섹션 5"></Card>
        <Card title="섹션 5" content="내용 예시 5" section="섹션 5"></Card>
        <Card title="섹션 5" content="내용 예시 5" section="섹션 5"></Card>
      </div>
    </Container>
  );
}

export default Home;
