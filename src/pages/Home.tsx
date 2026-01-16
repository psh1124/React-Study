import Container from "../components/Container";
import Card from "../components/Card";

function Home() {
  return (
    <Container>
      <h1>Home Page</h1>
      <div>
        <Card title="섹션 1" content="내용 예시 1"></Card>
        <Card title="섹션 2" content="내용 예시 2"></Card>
        <Card title="섹션 3" content="내용 예시 3"></Card>
      </div>
    </Container>
  );
}

export default Home;
