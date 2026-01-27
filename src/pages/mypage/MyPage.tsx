import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/useAuth";
import { AUTH_MESSAGES } from "../../constants/messages";
import { mockWithdraw } from "../../mocks/auth";
import "./MyPage.css";

function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const executeWithdraw = async (closeToast: () => void) => {
    if (!user) return;
    try {
      closeToast();
      await mockWithdraw(user.id);
      toast.success(AUTH_MESSAGES.WITHDRAW_SUCCESS);
      logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  const handleWithdrawClick = () => {
    if (!user) return;

    toast.warn(
      ({ closeToast }) => (
        <div className="withdraw-confirm-container">
          <p className="withdraw-confirm-text">
            {AUTH_MESSAGES.WITHDRAW_CONFIRM}
          </p>
          <div className="withdraw-confirm-buttons">
            <Button
              variant="danger"
              onClick={() => executeWithdraw(closeToast)}>
              탈퇴
            </Button>
            <Button onClick={closeToast}>취소</Button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  };

  return (
    <Container>
      <header className="mypage-header">
        <h1>마이페이지</h1>
        <p className="subtitle">내 계정 정보 및 활동 내역을 확인하세요.</p>
      </header>

      <div className="mypage-content">
        <section className="info-section">
          <h2>기본 정보</h2>
          <div className="info-grid">
            <Card title="닉네임" content={user?.nickname || "정보 없음"} />
            <Card title="이메일 계정" content={user?.email || "정보 없음"} />
          </div>
        </section>

        <section className="activity-section">
          <h2>활동 통계</h2>
          <div className="activity-grid">
            <div className="stat-item">
              <span className="stat-label">작성한 글</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">작성한 댓글</span>
              <span className="stat-value">0</span>
            </div>
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
