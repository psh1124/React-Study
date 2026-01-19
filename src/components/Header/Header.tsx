import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;
