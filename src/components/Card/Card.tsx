import { usePostLike } from "../../hooks/usePostLikes";
import "./Card.css";

interface CardProps {
  id: number;
  title: string;
  content: string;
  category?: string;
  author?: string;
  date?: string;
  likes?: number;
  comments?: number;
  onClick?: () => void;
}

function Card({
  id,
  title,
  content,
  category,
  author,
  date,
  likes = 0,
  comments = 0,
  onClick,
}: CardProps) {
  const { isLiked, likeCount, toggleLike } = usePostLike(id, likes);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike();
  };

  const hasFooter = likes !== undefined || comments !== undefined || date;

  return (
    <div className="card" onClick={onClick}>
      <div className="card__header">
        {category && <span className="card__category">{category}</span>}
        <h2 className="card__title">{title}</h2>
      </div>

      <p className="card__content">{content}</p>

      {author && (
        <div className="card__info">
          <span className="card__author">
            by <strong>{author}</strong>
          </span>
        </div>
      )}

      {hasFooter && (
        <div className="card__footer">
          <div className="card__stats">
            <div className="stat-group">
              <button
                className={`stat-item like-btn ${isLiked ? "active" : ""}`}
                onClick={handleLikeClick}
                aria-label="좋아요">
                {isLiked ? "❤️" : "🤍"} {likeCount}
              </button>
              <span className="stat-item" aria-label="댓글">
                💬 {comments}
              </span>
            </div>
            {date && <span className="card__date">{date}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
