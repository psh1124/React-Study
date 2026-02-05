import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../../services/postService";
import PostForm from "../../components/PostForm/PostForm";
import { notify } from "../../utils/toastService";
import type { Post } from "../../data/mockData";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const targetPost = postService.getById(Number(id));
      if (targetPost) {
        setPost(targetPost);
      } else {
        notify.error("게시글을 찾을 수 없습니다.");
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleUpdate = async (formData: {
    title: string;
    content: string;
    category: string;
  }) => {
    if (!id) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      postService.update(Number(id), formData);

      notify.saveSuccess(true);
      navigate("/");
    } catch {
      notify.error("수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return null;

  return (
    <PostForm
      initialData={post}
      onSubmit={handleUpdate}
      isEdit={true}
      isLoading={isSubmitting}
    />
  );
};

export default Edit;
