import { toast } from "react-toastify";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  info: (msg: string) => toast.info(msg),

  saveSuccess: (isEdit: boolean) => {
    const message = isEdit
      ? "✅ 수정이 완료되었습니다!"
      : "🚀 새 글이 등록되었습니다!";
    return toast.success(message, {
      icon: false,
    });
  },

  deleteSuccess: () =>
    toast.success("🗑️ 게시글이 삭제되었습니다.", {
      icon: false,
    }),

  requireLogin: () =>
    toast.info("🔒 로그인이 필요한 서비스입니다.", {
      toastId: "auth-required",
      icon: false,
    }),
};
