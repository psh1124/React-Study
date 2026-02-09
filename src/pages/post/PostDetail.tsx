import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { notify } from "../../utils/toastService";
import { postService } from "../../services/postService";
import { commentService } from "../../services/commentService";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import "./PostDetail.css";
import type { Post, Comment } from "../../data/mockData";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  useLocation();

  const isIncremented = useRef(false);

  const [post, setPost] = useState<Post | null>(() => {
    if (!id) return null;
    return postService.getById(Number(id)) || null;
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (post && !isIncremented.current) {
      isIncremented.current = true;
      postService.incrementViews(post.id);

      setTimeout(() => {
        setPost((prev) => (prev ? { ...prev, views: prev.views + 1 } : null));
      }, 0);
    }
  }, [post]);

  useEffect(() => {
    if (id && !post) {
      navigate("/", {
        replace: true,
        state: { toastMessage: "존재하지 않는 게시글입니다." },
      });
    }
  }, [id, post, navigate]);

  useEffect(() => {
    if (post) {
      const fetchedComments = commentService.getByPostId(post.id);
      setTimeout(() => {
        setComments(fetchedComments);
      }, 0);
    }
  }, [post]);

  if (!post) return <Container>로딩 중...</Container>;

  const handleDelete = () => {
    notify.confirmDelete(() => {
      if (post) {
        postService.delete(post.id);
        notify.deleteSuccess();
        navigate("/", { replace: true });
      }
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    if (!user || !user.nickname) {
      notify.requireLogin();
      return;
    }

    const newComment = commentService.create(
      post.id,
      user.nickname,
      commentInput,
    );
    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
    notify.success("댓글이 등록되었습니다.");
  };

  const handleCommentDelete = (commentId: number) => {
    notify.confirmDelete(() => {
      commentService.delete(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      notify.success("댓글이 삭제되었습니다.");
    });
  };

  const isMine = user?.nickname === post.author;

  return (
    <Container>
      <article className="post-detail">
        <header className="post-header">
          <div className="post-meta">
            <span className="category">{post.category}</span>
            <span className="date">{post.date}</span>
            <span className="views">👀 {post.views}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="author-info">
            <div className="author-avatar">{post.author[0]}</div>
            <span className="author-name">{post.author}</span>
          </div>
        </header>

        <hr className="divider" />

        <section className="post-content">
          <p>{post.content}</p>
        </section>

        <footer className="post-footer">
          <div className="post-actions">
            <Button onClick={() => navigate(-1)} variant="secondary">
              뒤로가기
            </Button>
            {isMine && (
              <div className="owner-actions">
                <Button onClick={() => navigate(`/edit/${post.id}`)}>
                  수정
                </Button>
                <Button onClick={handleDelete} variant="danger">
                  삭제
                </Button>
              </div>
            )}
          </div>
        </footer>
      </article>

      <section className="comments-section" style={{ marginTop: "40px" }}>
        <h3>댓글 {comments.length}개</h3>
        <div
          className="comment-form-container"
          style={{ marginBottom: "30px" }}>
          {user ? (
            <form
              onSubmit={handleCommentSubmit}
              style={{ display: "flex", gap: "10px" }}>
              <input
                id="commentInput"
                type="text"
                placeholder="댓글을 입력하세요..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <Button type="submit">등록</Button>
            </form>
          ) : (
            <div
              onClick={() => navigate("/login")}
              style={{
                padding: "20px",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                borderRadius: "8px",
                cursor: "pointer",
              }}>
              로그인하고 첫 댓글을 남겨보세요! ✍️
            </div>
          )}
        </div>

        {comments.length > 0 ? (
          <ul
            className="comment-list"
            style={{ listStyle: "none", padding: 0 }}>
            {comments.map((comment) => (
              <li
                key={comment.id}
                style={{
                  padding: "15px 0",
                  borderBottom: "1px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                <div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ marginRight: "10px" }}>
                      {comment.author}
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "#999" }}>
                      {comment.date}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: "#333" }}>{comment.content}</p>
                </div>

                {user?.nickname === comment.author && (
                  <button
                    onClick={() => handleCommentDelete(comment.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4d4f",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}>
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#999", textAlign: "center", padding: "20px 0" }}>
            아직 댓글이 없습니다.
          </p>
        )}
      </section>
    </Container>
  );
}

export default PostDetail;
