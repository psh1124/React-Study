import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/useAuth";
import { mockWithdraw } from "../../mocks/auth";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  const handleWithdraw = async () => {
    if (!user) return;

    const ok = confirm("회원탈퇴를 하시겠습니까?\n추후에 재가입 가능합니다.");
    if (!ok) return;

    await mockWithdraw(user.id);
    logout();
    alert("탈퇴가 완료되었습니다.");
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" end className="logo">
          React Study
        </NavLink>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          홈
        </NavLink>

        {/* 로그인 상태 */}
        {isLoggedIn ? (
          <>
            <span className="nav-item user-nickname">
              {user?.nickname}님
            </span>

            <button
              className="nav-item logout-btn"
              onClick={handleLogout}
            >
              로그아웃
            </button>
            
            <button
              className="nav-item withdraw-btn"
              onClick={handleWithdraw}
            >
              회원탈퇴
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              회원가입
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
