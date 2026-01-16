import './Card.css'

interface CardProps {
    title: string
    content: string
}

function Card({ title, content }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Card;
