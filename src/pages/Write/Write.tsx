import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { postService } from "../../services/postService";
import PostForm from "../../components/PostForm/PostForm";
import { notify } from "../../utils/toastService";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (formData: {
    title: string;
    content: string;
    category: string;
  }) => {
    if (!user?.nickname) {
      notify.requireLogin();
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      postService.create({
        ...formData,
        author: user.nickname,
      });

      notify.saveSuccess(false);
      navigate("/");
    } catch {
      notify.error("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <PostForm onSubmit={handleCreate} isLoading={isSubmitting} />;
};

export default Write;
