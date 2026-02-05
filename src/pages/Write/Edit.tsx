import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../../services/postService";
import PostForm from "../../components/PostForm/PostForm";
import { notify } from "../../utils/toastService";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = postService.getById(Number(id));

  const handleUpdate = (formData: {
    title: string;
    content: string;
    category: string;
  }) => {
    if (!id) return;

    postService.update(Number(id), formData);
    notify.saveSuccess(true);
    navigate("/");
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <PostForm key={post.id} initialData={post} onSubmit={handleUpdate} isEdit />
  );
};

export default Edit;
