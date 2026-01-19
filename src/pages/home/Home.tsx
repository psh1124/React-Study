import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";

function Home() {
  return (
    <Container>
      <h1>Home Page</h1>
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
