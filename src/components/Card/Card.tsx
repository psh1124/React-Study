import "./Card.css";

interface CardProps {
  section: string;
  title: string;
  content: string;
}

function Card({ title, content, section }: CardProps) {
  const click = () => {
    console.log(`${section} 선택됨`);
  };

  return (
    <div className="card" onClick={click}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Card;
