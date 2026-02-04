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
  showComments = true,
  isMine = false,
  onLike,
  onClick,
  onDelete,
  onEdit,
}: CardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      notify.requireLogin();
      return;
    }
    onLike?.();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/login");
  };

  const hasFooter = likes !== undefined || comments !== undefined || date;
  const textareaId = `comment-${id}`;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onEdit) {
      onEdit();
    } else {
      navigate(`/edit/${id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("정말 이 글을 삭제하시겠습니까?")) {
      onDelete?.();
    }
  };

  return (
    <div className="card" onClick={onClick}>
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
                className={`stat-item like-btn ${isLoggedIn && isLiked ? "active" : ""}`}
                onClick={handleLikeClick}>
                {isLiked ? "❤️" : "🤍"} {likes}
              </button>
              <span className="stat-item">💬 {comments || 0}</span>
            </div>
            {date && <span className="card__date">{date}</span>}
          </div>
        </div>
      )}

      {showComments && (
        <div className="comment-section" onClick={(e) => e.stopPropagation()}>
          {isLoggedIn ? (
            <div className="comment-input-wrapper">
              <textarea
                id={textareaId}
                className="comment-input-area"
                placeholder="댓글을 남겨보세요..."
              />
            </div>
          ) : (
            <div className="login-prompt-bar" onClick={handleOverlayClick}>
              <span>
                💬 댓글을 쓰려면 <strong>로그인</strong>이 필요합니다.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default Card;
