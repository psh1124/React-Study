import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import { AUTH_MESSAGES } from "../../constants/messages";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // PrivateRoute.tsx
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error(AUTH_MESSAGES.LOGIN_REQUIRED, {
        toastId: "login-required", // 실무 테크닉: 중복 방지 고유 ID
      });
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
}

export default ProtectedRoute;
