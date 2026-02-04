import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import Button from "../components/Button/Button";

export const notify = {
  // 기본 공통 메서드
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: (id?: string) => toast.dismiss(id),

  // 인증 및 계정관련
  loginSuccess: (nickname: string) =>
    toast.success(`👋 반갑습니다, ${nickname}님!`, { icon: false }),

  signupSuccess: (nickname: string) =>
    toast.success(`🎉 ${nickname}님, 가입을 환영합니다!`, { icon: false }),

  logoutSuccess: () =>
    toast.info("로그아웃 되었습니다. 다음에 또 봐요!", { icon: false }),

  requireLogin: (navigate?: (path: string) => void) =>
    toast.info(AUTH_MESSAGES.LOGIN_REQUIRED, {
      toastId: "login-required",
      icon: false,
      onClick: () => navigate?.("/login"),
    }),

  withdrawSuccess: () =>
    toast.success(AUTH_MESSAGES.WITHDRAW_SUCCESS, { icon: false }),

  withdrawConfirm: (onWithdraw: () => void, onCancel: () => void, isLoading: boolean) =>
    toast.warn(
      ({ closeToast }) => (
        <div className="withdraw-confirm-container">
          <p className="withdraw-confirm-text">{AUTH_MESSAGES.WITHDRAW_CONFIRM}</p>
          <div className="withdraw-confirm-buttons" style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <Button variant="danger" loading={isLoading} onClick={onWithdraw}>탈퇴</Button>
            <Button onClick={() => { onCancel(); closeToast(); }}>취소</Button>
          </div>
        </div>
      ),
      {
        toastId: "withdraw-confirm",
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    ),

    // 게시글 관련
  saveSuccess: (isEdit: boolean) =>
    toast.success(isEdit ? "✅ 수정이 완료되었습니다!" : "🚀 새 글이 등록되었습니다!", { icon: false }),

  deleteSuccess: () =>
    toast.success("🗑️ 게시글이 삭제되었습니다.", { icon: false }),

  // 시스템 및 검증 관련
  validationFail: () =>
    toast.warn("입력 양식을 다시 확인해주세요.", { toastId: "valid-fail" }),

  serverError: () =>
    toast.error("서버 연결이 원활하지 않습니다. 잠시 후 시도해주세요.", { toastId: "server-err" }),
};