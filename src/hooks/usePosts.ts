import { useState, useMemo, useCallback, useEffect } from "react";
import { postService } from "../services/postService";
import { type Post } from "../data/mockData";
import { notify } from "../utils/toastService";
import { useLoading } from "../context/loading/useLoading";

interface AuthUser {
  nickname?: string;
}

export function usePosts(
  user: AuthUser | null | undefined,
  isLoggedIn: boolean,
) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<"latest" | "likes" | "views">("latest");
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  const { showLoading, hideLoading } = useLoading();

  const loadPosts = useCallback(() => {
    const data = postService.getPostsWithCommentCount();
    setPosts(data);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const deletePost = async (postId: number) => {
    showLoading();
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      postService.delete(postId);
      loadPosts();
      notify.deleteSuccess();
    } catch {
      notify.error("삭제 중 오류가 발생했습니다.");
    } finally {
      hideLoading();
    }
  };

  const toggleLike = useCallback(
    (id: number) => {
      if (!isLoggedIn || !user?.nickname) {
        notify.requireLogin();
        return;
      }
      postService.toggleLike(id, user.nickname);
      loadPosts();
    },
    [isLoggedIn, user, loadPosts],
  );

  const processedPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "전체" || post.category === selectedCategory;

      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesLiked = showOnlyLiked
        ? post.likedBy?.includes(user?.nickname || "")
        : true;

      return matchesCategory && matchesSearch && matchesLiked;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "likes") {
        return (b.likes || 0) - (a.likes || 0);
      }
      if (sortBy === "views") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
  }, [posts, searchTerm, selectedCategory, sortBy, showOnlyLiked, user]);

  return {
    posts: processedPosts,
    allPostsCount: posts.length,
    searchTerm,
    selectedCategory,
    sortBy,
    showOnlyLiked,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setShowOnlyLiked,
    actions: {
      deletePost,
      toggleLike,
      refresh: loadPosts,
    },
    loadPosts,
  };
}
