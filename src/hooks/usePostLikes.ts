import { useState } from "react";

export const usePostLike = (id: number, initialLikes: number) => {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem("likedPosts");
    return saved ? JSON.parse(saved).includes(id) : false;
  });

  const [likeCount, setLikeCount] = useState(() => {
    const savedCounts = localStorage.getItem("postLikeCounts");
    if (savedCounts) {
      const counts = JSON.parse(savedCounts);
      return counts[id] !== undefined ? counts[id] : initialLikes;
    }
    return initialLikes;
  });

  const toggleLike = () => {
    const savedLikes = localStorage.getItem("likedPosts");
    const savedCounts = localStorage.getItem("postLikeCounts");

    let likedIds: number[] = savedLikes ? JSON.parse(savedLikes) : [];
    const counts = savedCounts ? JSON.parse(savedCounts) : {};

    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    if (newIsLiked) {
      likedIds.push(id);
    } else {
      likedIds = likedIds.filter((likedId) => likedId !== id);
    }
    counts[id] = newCount;

    localStorage.setItem("likedPosts", JSON.stringify(likedIds));
    localStorage.setItem("postLikeCounts", JSON.stringify(counts));

    setIsLiked(newIsLiked);
    setLikeCount(newCount);
  };

  return { isLiked, likeCount, toggleLike };
};
