import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/mypage", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return null;

  return <>{children}</>;
}

export default PublicRoute;
