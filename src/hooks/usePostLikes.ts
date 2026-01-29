import { useState } from "react";
import { STORAGE_KEYS } from "../constants/storage";

export const usePostLike = (id: number, initialLikes: number) => {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIKED_POSTS);
    return saved ? JSON.parse(saved).includes(id) : false;
  });

  const [likeCount, setLikeCount] = useState(() => {
    const savedCounts = localStorage.getItem(STORAGE_KEYS.POST_LIKE_COUNTS);
    if (savedCounts) {
      const counts = JSON.parse(savedCounts);
      return counts[id] !== undefined ? counts[id] : initialLikes;
    }
    return initialLikes;
  });

  const toggleLike = () => {
    const savedLikes = localStorage.getItem(STORAGE_KEYS.LIKED_POSTS);
    const savedCounts = localStorage.getItem(STORAGE_KEYS.POST_LIKE_COUNTS);

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

    localStorage.setItem(STORAGE_KEYS.LIKED_POSTS, JSON.stringify(likedIds));
    localStorage.setItem(STORAGE_KEYS.POST_LIKE_COUNTS, JSON.stringify(counts));

    setIsLiked(newIsLiked);
    setLikeCount(newCount);
  };

  return { isLiked, likeCount, toggleLike };
};
