import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/useAuth";
import Button from "../Button/Button";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setIsLogoutLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      logout();
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      setIsLogoutLoading(false);
    }
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

        {isLoggedIn ? (
          <>
            <NavLink to="mypage" end className="nav-item user-nickname">
              {user?.nickname}님
            </NavLink>

            <Button
              variant="danger"
              loading={isLogoutLoading}
              onClick={handleLogout}
              className="nav-item logout-btn"
              style={{ padding: "0.4em 0.8em", minHeight: "2.2rem" }}>
              로그아웃
            </Button>
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
