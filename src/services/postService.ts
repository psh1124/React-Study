import { type Post, MOCK_POSTS } from "../data/mockData";
import { commentService } from "./commentService";

const STORAGE_KEY = "posts";

class PostService {
  private getStoredPosts(): Post[] {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      this.saveAll(MOCK_POSTS);
      return MOCK_POSTS;
    }

    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("데이터 파싱 에러:", e);
      return MOCK_POSTS;
    }
  }

  getAll(): Post[] {
    return this.getStoredPosts();
  }

  getById(id: number): Post | undefined {
    return this.getAll().find((post) => post.id === id);
  }

  saveAll(posts: Post[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  create(newPost: {
    title: string;
    content: string;
    category: string;
    author: string;
  }): Post {
    const posts = this.getAll();
    const post: Post = {
      ...newPost,
      id: Date.now(),
      date: new Date().toLocaleDateString().replace(/\s/g, "").slice(0, -1),
      likes: 0,
      comments: 0,
      likedBy: [],
      views: 0,
    };
    this.saveAll([post, ...posts]);
    return post;
  }

  update(id: number, updatedPost: Partial<Post>): void {
    const posts = this.getAll();
    const index = posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedPost };
      this.saveAll(posts);
    }
  }

  delete(id: number): void {
    const posts = this.getAll();
    const filteredPosts = posts.filter((post) => post.id !== id);
    this.saveAll(filteredPosts);
  }

  toggleLike(postId: number, nickname: string): void {
    const posts = this.getAll();
    const index = posts.findIndex((p) => p.id === postId);

    if (index !== -1) {
      const post = posts[index];
      if (!post.likedBy) post.likedBy = [];

      const isAlreadyLiked = post.likedBy.includes(nickname);

      if (isAlreadyLiked) {
        post.likedBy = post.likedBy.filter((n) => n !== nickname);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.likedBy.push(nickname);
        post.likes += 1;
      }

      posts[index] = { ...post };
      this.saveAll(posts);
    }
  }

  incrementViews(id: number): void {
    const posts = this.getAll();
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, views: post.views + 1 } : post,
    );
    this.saveAll(updatedPosts);
  }

  getPostsWithCommentCount(): Post[] {
    const posts = this.getAll();

    return posts.map((post) => {
      const realComments = commentService.getByPostId(post.id);
      return {
        ...post,
        comments: realComments.length,
      };
    });
  }
}

export const postService = new PostService();
