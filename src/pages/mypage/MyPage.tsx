import { useAuth } from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { notify } from "../../utils/toastService";
import { mockWithdraw } from "../../mocks/auth";
import { postService } from "../../services/postService";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import "./MyPage.css";

function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const myPosts = useMemo(() => {
    if (!user) return [];
    return postService.getAll().filter((post) => post.author === user.nickname);
  }, [user]);

  const handleDeletePost = (postId: number) => {
    notify.confirmDelete(() => {
      postService.delete(postId);
      notify.deleteSuccess();

      window.location.reload();
    });
  };

  const executeWithdraw = async () => {
    if (!user) return;
    setIsWithdrawing(true);

    try {
      await mockWithdraw(user.id);
      notify.dismiss();
      notify.withdrawSuccess();
      navigate("/", { replace: true });
      setTimeout(() => logout(), 100);
    } catch {
      notify.error("탈퇴 처리 중 오류가 발생했습니다.");
      setIsWithdrawing(false);
    }
  };

  const handleWithdrawClick = () => {
    if (!user) return;
    notify.withdrawConfirm(
      executeWithdraw,
      () => setIsWithdrawing(false),
      isWithdrawing,
    );
  };

  return (
    <Container>
      {isWithdrawing && <LoadingOverlay />}

      <header className="mypage-header">
        <h1>마이페이지</h1>
        <p className="subtitle">내 계정 정보 및 활동 내역을 확인하세요.</p>
      </header>

      <div className="mypage-content">
        <section className="info-section">
          <h2>기본 정보</h2>
          <div className="info-grid">
            <div className="info-card-wrapper">
              <div className="info-label">닉네임</div>
              <div className="info-value">{user?.nickname || "정보 없음"}</div>
            </div>
            <div className="info-card-wrapper">
              <div className="info-label">이메일 계정</div>
              <div className="info-value">{user?.email || "정보 없음"}</div>
            </div>
          </div>
        </section>

        <section className="activity-section">
          <h2>활동 통계</h2>
          <div className="activity-grid">
            <div className="stat-item">
              <span className="stat-label">작성한 글</span>
              <span className="stat-value">{myPosts.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">작성한 댓글</span>
              <span className="stat-value">0</span>
            </div>
          </div>
        </section>

        <section className="my-posts-section">
          <h2>내가 작성한 글</h2>
          <div className="posts-grid">
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <Card
                  key={post.id}
                  {...post}
                  showComments={false}
                  isMine={true}
                  onDelete={() => handleDeletePost(post.id)}
                  onEdit={() => navigate(`/edit/${post.id}`)}
                />
              ))
            ) : (
              <p className="empty-message">아직 작성한 포스트가 없습니다.</p>
            )}
          </div>
        </section>
      </div>

      <footer className="mypage-footer">
        <Button variant="danger" onClick={handleWithdrawClick}>
          회원 탈퇴
        </Button>
      </footer>
    </Container>
  );
}

export default MyPage;
