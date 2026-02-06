import type { Comment } from "../data/mockData";

const STORAGE_KEY = "it_blog_comments";

class CommentService {
  getByPostId(postId: number): Comment[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = saved ? JSON.parse(saved) : [];
    return allComments
      .filter((c) => c.postId === postId)
      .sort((a, b) => b.id - a.id);
  }

  create(postId: number, author: string, content: string): Comment {
    const saved = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = saved ? JSON.parse(saved) : [];

    const newComment: Comment = {
      id: Date.now(),
      postId,
      author,
      content,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newComment, ...allComments]),
    );
    return newComment;
  }
}

export const commentService = new CommentService();
