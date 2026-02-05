import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import Button from "../components/Button/Button";
import "./toastService.css";

// 기존에 활성화된 toast 존재시 흔들림 애니메이션

const shakeExistingToast = (id: string) => {
  if (toast.isActive(id)) {
    toast.update(id, { className: "Toastify__toast" });
    setTimeout(() => {
      toast.update(id, { className: "shake-animation" });
    }, 10);
    return true;
  }
  return false;
};

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  info: (msg: string) => toast.info(msg),

  // 성공알림
  loginSuccess: (nickname: string) =>
    toast.success(`👋 반갑습니다, ${nickname}님!`, { icon: false }),

  signupSuccess: (nickname: string) =>
    toast.success(`🎉 ${nickname}님, 가입을 환영합니다!`, { icon: false }),

  saveSuccess: (isEdit: boolean) =>
    toast.success(
      isEdit ? "✅ 수정이 완료되었습니다!" : "🚀 새 글이 등록되었습니다!",
      { toastId: "save-success-id", icon: false },
    ),

  deleteSuccess: () =>
    toast.success("🗑️ 게시글이 삭제되었습니다.", {
      toastId: "delete-success-id",
      icon: false,
    }),

  withdrawSuccess: () =>
    toast.success(AUTH_MESSAGES.WITHDRAW_SUCCESS, { icon: false }),

  // 사용자확인 알림
  confirmDelete: (onConfirm: () => void) => {
    const TOAST_ID = "confirm-delete";

    // if (shakeExistingToast(TOAST_ID)) return;
    toast.dismiss(TOAST_ID);

    toast.warn(
      ({ closeToast }) => (
        <div className="custom-confirm">
          <p>정말 삭제하시겠습니까?</p>
          <div className="confirm-buttons-group">
            <button className="confirm-btn cancel" onClick={closeToast}>
              취소
            </button>
            <button
              className="confirm-btn delete"
              onClick={() => {
                onConfirm();
                closeToast();
              }}>
              삭제
            </button>
          </div>
        </div>
      ),
      {
        toastId: TOAST_ID,
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  },

  confirmCancel: (onConfirm: () => void) => {
    const TOAST_ID = "confirm-cancel";
    if (shakeExistingToast(TOAST_ID)) return;

    toast.info(
      ({ closeToast }) => (
        <div className="custom-confirm">
          <p>
            작성 중인 내용은 저장되지 않습니다. <br /> 정말 나가시겠습니까?
          </p>
          <div className="confirm-buttons-group">
            <button className="confirm-btn cancel" onClick={closeToast}>
              계속 작성
            </button>
            <button
              className="confirm-btn info"
              onClick={() => {
                onConfirm();
                closeToast();
              }}>
              나가기
            </button>
          </div>
        </div>
      ),
      {
        toastId: TOAST_ID,
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
      },
    );
  },

  withdrawConfirm: (
    onWithdraw: () => void,
    onCancel: () => void,
    isLoading: boolean,
  ) => {
    const TOAST_ID = "withdraw-confirm";
    if (shakeExistingToast(TOAST_ID)) return;

    toast.warn(
      ({ closeToast }) => (
        <div className="withdraw-confirm-container">
          <p className="withdraw-confirm-text">
            {AUTH_MESSAGES.WITHDRAW_CONFIRM}
          </p>
          <div className="confirm-buttons-group">
            <Button variant="danger" loading={isLoading} onClick={onWithdraw}>
              탈퇴
            </Button>
            <Button
              onClick={() => {
                onCancel();
                closeToast();
              }}>
              취소
            </Button>
          </div>
        </div>
      ),
      {
        toastId: TOAST_ID,
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  },

  // 안내알림
  logoutSuccess: () =>
    toast.info("로그아웃 되었습니다. 다음에 또 봐요!", { icon: false }),

  requireLogin: (navigate?: (path: string) => void) =>
    toast.info(AUTH_MESSAGES.LOGIN_REQUIRED, {
      toastId: "login-required",
      icon: false,
      onClick: () => navigate?.("/login"),
    }),

  // 정리
  dismiss: (id?: string) => toast.dismiss(id),
};
