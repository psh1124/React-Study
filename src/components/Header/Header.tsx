import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../Button/Button";
import { mockLogout } from "../../mocks/auth";
import logo from "/favicon.png";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await mockLogout();
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
      <NavLink to="/" end className="brand-group">
        <img src={logo} alt="React Logo" className="header-logo" />
        <span className="logo">React Study</span>
      </NavLink>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/mypage" className="nav-item user-nickname">
              {user?.nickname}님
            </NavLink>
            <Button
              variant="danger"
              loading={isLogoutLoading}
              onClick={handleLogout}
              className="nav-item logout-btn"
              style={{ padding: "0.4em 0.8em", minHeight: "2.2rem" }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              SignIn
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              SignUp
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
