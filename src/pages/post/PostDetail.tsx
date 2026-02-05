import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { notify } from "../../utils/toastService";
import { postService } from "../../services/postService";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const post = id ? postService.getById(Number(id)) : null;

  useEffect(() => {
    if (id && !post) {
      notify.error("존재하지 않는 게시글입니다.");
      navigate("/", { replace: true });
    }
  }, [id, post, navigate]);

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

  if (!post) return <Container>로딩 중...</Container>;

  const isMine = user?.nickname === post.author;

  return (
    <Container>
      <article className="post-detail">
        <header className="post-header">
          <div className="post-meta">
            <span className="category">{post.category}</span>
            <span className="date">{post.createdAt}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="author-info">
            <div className="author-avatar">{post.author[0]}</div>
            <span className="author-name">{post.author}</span>
          </div>
        </header>

        <hr className="divider" />

        <section className="post-content">
          \<p>{post.content}</p>
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

      <section className="comments-section">
        <h3>댓글 0개</h3>
        <p className="empty-comments">
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </p>
      </section>
    </Container>
  );
}

export default PostDetail;
