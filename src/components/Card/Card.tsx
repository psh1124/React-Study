import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import "./Card.css";
import { notify } from "../../utils/toastService";
import { memo } from "react";

interface CardProps {
  id: number;
  title: string;
  content: string;
  category?: string;
  author?: string;
  date?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  showComments?: boolean;
  isMine?: boolean;
  views?: number;
  onLike?: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Card = memo(function Card({
  id,
  title,
  content,
  category,
  author,
  date,
  likes,
  comments,
  isLiked,
  isMine = false,
  views,
  onLike,
  onClick,
  onDelete,
  onEdit,
}: CardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleMoveToDetail = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/postdetail/${id}`);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      notify.requireLogin();
      return;
    }
    onLike?.();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    } else {
      navigate(`/edit/${id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    notify.confirmDelete(() => {
      if (onDelete) onDelete();
    });
  };

  const hasFooter = likes !== undefined || comments !== undefined || date;

  return (
    <div className="card">
      <div className="card__clickable-area" onClick={handleMoveToDetail}>
        {isMine && (
          <div className="card__admin-actions">
            <button
              className="card__edit-btn"
              onClick={handleEditClick}
              title="수정">
              ✏️
            </button>
            <button
              className="card__delete-btn"
              onClick={handleDeleteClick}
              title="삭제">
              🗑️
            </button>
          </div>
        )}

        <div className="card__header">
          {category && <span className="card__category">{category}</span>}
          <h2 className="card__title" style={{ marginBottom: "4px" }}>
            {title}
          </h2>
        </div>

        <p
          className="card__content"
          style={{ marginTop: "0", marginBottom: "16px" }}>
          {content}
        </p>

        {author && (
          <div className="card__info" style={{ marginTop: "auto" }}>
            <span className="card__author">
              by <strong>{author}</strong>
            </span>
          </div>
        )}
      </div>

      {hasFooter && (
        <div className="card__footer">
          <div className="card__stats">
            <div className="stat-group">
              <button
                className={`stat-item like-btn ${isLoggedIn && isLiked ? "active" : ""}`}
                onClick={handleLikeClick}>
                {isLiked ? "❤️" : "🤍"} {likes}
              </button>
              <span className="stat-item">💬 {comments || 0}</span>
              <span className="stat-item">👀 {views || 0}</span>
            </div>
            {date && <span className="card__date">{date}</span>}
          </div>
        </div>
      )}
    </div>
  );
});

export default Card;
