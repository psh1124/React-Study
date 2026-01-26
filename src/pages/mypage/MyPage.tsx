import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { useAuth } from "../../context/useAuth";
import "./MyPage.css";
import { AUTH_MESSAGES } from "../../constants/messages";
import { toast } from "react-toastify";
import { mockWithdraw } from "../../mocks/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleWithdraw = () => {
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
              onClick={async () => {
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
              }}>
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
      <div className="mypage-header">
        <h1>마이페이지</h1>
        <p className="subtitle">내 계정 정보 및 활동 내역을 확인하세요.</p>
      </div>

      <div className="mypage-content">
        <section className="info-section">
          <h2>기본 정보</h2>
          <div className="info-grid">
            <Card
              title="닉네임"
              content={user?.nickname || "정보 없음"}
              section="profile"
            />
            <Card
              title="이메일 계정"
              content={user?.email || "정보 없음"}
              section="profile"
            />
          </div>
        </section>

        <section className="activity-section">
          <h2>활동 통계</h2>
          <div className="activity-grid">
            <div className="stat-item">
              <span className="stat-label">작성한 글</span>
              <span className="stat-value">00</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">작성한 댓글</span>
              <span className="stat-value">00</span>
            </div>
          </div>
        </section>
      </div>
      <Button variant="danger" onClick={handleWithdraw}>
        회원 탈퇴
      </Button>
    </Container>
  );
}

export default MyPage;
