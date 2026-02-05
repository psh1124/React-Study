import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { postService } from "../../services/postService";
import PostForm from "../../components/PostForm/PostForm";
import { notify } from "../../utils/toastService";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreate = (formData: {
    title: string;
    content: string;
    category: string;
  }) => {
    if (!user?.nickname) {
      notify.requireLogin();
      return;
    }

    postService.create({
      ...formData,
      author: user.nickname,
    });

    notify.saveSuccess(false);
    navigate("/");
  };

  return <PostForm onSubmit={handleCreate} />;
};

export default Write;
