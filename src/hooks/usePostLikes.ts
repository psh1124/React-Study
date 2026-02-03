import { useState } from "react";
import { storage, STORAGE_KEYS } from "../constants/storage";

export const usePostLike = (id: number, initialLikes: number) => {
  const [isLiked, setIsLiked] = useState(() => {
    const likedIds = storage.get<number[]>(STORAGE_KEYS.LIKED_POSTS, []);
    return likedIds.includes(id);
  });

  const [likeCount, setLikeCount] = useState(() => {
    const counts = storage.get<Record<number, number>>(
      STORAGE_KEYS.POST_LIKE_COUNTS,
      {},
    );
    return counts[id] ?? initialLikes;
  });

  const toggleLike = () => {
    const likedIds = storage.get<number[]>(STORAGE_KEYS.LIKED_POSTS, []);
    const counts = storage.get<Record<number, number>>(
      STORAGE_KEYS.POST_LIKE_COUNTS,
      {},
    );

    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    const newLikedIds = newIsLiked
      ? [...likedIds, id]
      : likedIds.filter((likedId) => likedId !== id);

    const newCounts = { ...counts, [id]: newCount };

    storage.set(STORAGE_KEYS.LIKED_POSTS, newLikedIds);
    storage.set(STORAGE_KEYS.POST_LIKE_COUNTS, newCounts);

    setIsLiked(newIsLiked);
    setLikeCount(newCount);
  };

  return { isLiked, likeCount, toggleLike };
};
