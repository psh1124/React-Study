import { useState } from "react";
import type { Post } from "../../data/mockData";
import "./PostForm.css";
import { notify } from "../../utils/toastService";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: {
    title: string;
    content: string;
    category: string;
  }) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

const PostForm = ({
  initialData,
  onSubmit,
  isEdit = false,
  isLoading = false,
}: PostFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "React",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    notify.confirmCancel(() => {
      navigate(-1);
    });
  };

  return (
    <div className="post-form-container">
      <h2 className="post-form-title">
        {isEdit ? "✨ 게시글 수정하기" : "📝 새로운 지식 공유"}
      </h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            aria-label="카테고리 선택">
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        <div className="form-group">
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="content"
            placeholder="당신의 멋진 지식을 들려주세요..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />
        </div>

        <div className="form-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}>
            취소
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            {isEdit ? "수정 완료" : "출간하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
