import { MOCK_COMMENTS, type Comment } from "../data/mockData";
import { STORAGE_KEYS } from "../constants/storage";

class CommentService {
  private getStoredComments(): Comment[] {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);

    if (!saved) {
      this.saveAll(MOCK_COMMENTS);
      return MOCK_COMMENTS;
    }

    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("댓글 파싱 에러:", e);
      return MOCK_COMMENTS;
    }
  }

  getAll(): Comment[] {
    return this.getStoredComments();
  }

  private saveAll(comments: Comment[]): void {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }

  deleteAllByAuthor(nickname: string): void {
    const allComments = this.getAll();
    const remainingComments = allComments.filter((c) => c.author !== nickname);
    this.saveAll(remainingComments);
  }

  delete(commentId: number): void {
    const allComments = this.getAll();
    const filteredComments = allComments.filter((c) => c.id !== commentId);
    this.saveAll(filteredComments);
  }

  getByPostId(postId: number): Comment[] {
    const allComments = this.getAll();
    return allComments
      .filter((c) => c.postId === postId)
      .sort((a, b) => b.id - a.id);
  }

  create(postId: number, author: string, content: string): Comment {
    const allComments = this.getAll();
    const newComment: Comment = {
      id: Date.now(),
      postId,
      author,
      content,
      date: new Date().toLocaleDateString(),
    };

    this.saveAll([newComment, ...allComments]);
    return newComment;
  }
}

export const commentService = new CommentService();
