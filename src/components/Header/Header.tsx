import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/useAuth";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          }>
          홈
        </NavLink>

        {/* 로그인 상태 */}
        {isLoggedIn ? (
          <>
            <NavLink to="mypage" end className="nav-item user-nickname">
              {user?.nickname}님
            </NavLink>

            <button className="nav-item logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              회원가입
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
