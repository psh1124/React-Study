import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
import { AUTH_MESSAGES } from "../../constants/messages";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error(AUTH_MESSAGES.LOGIN_REQUIRED, {
        toastId: "login-required",
      });
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
}

export default ProtectedRoute;
