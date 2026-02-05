import { useState, useMemo, useCallback } from "react";
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
  const [posts, setPosts] = useState<Post[]>(() => postService.getAll());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<"latest" | "likes">("latest");
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  const { showLoading, hideLoading } = useLoading();

  const refresh = useCallback(() => {
    setPosts(postService.getAll());
  }, []);

  const deletePost = async (postId: number) => {
    showLoading();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const storedPosts: Post[] = JSON.parse(
        localStorage.getItem("posts") || "[]",
      );
      const updatedPosts = storedPosts.filter(
        (post: Post) => post.id !== postId,
      );

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPosts(updatedPosts);

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
      refresh();
    },
    [isLoggedIn, user, refresh],
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
      if (sortBy === "latest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.likes - a.likes;
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
    },
  };
}
