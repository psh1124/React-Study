export const STORAGE_KEYS = {
  USER: "user",
  MOCK_USERS: "mock_users",
  POSTS: "posts",
  LIKED_POSTS: "likedPosts",
  POST_LIKE_COUNTS: "postLikeCounts",
  COMMENTS: "comments",
} as const;

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return defaultValue;
      return JSON.parse(saved) as T;
    } catch (error) {
      console.error(`LocalStorage 로드 실패 [${key}]:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`LocalStorage 저장 실패 [${key}]:`, error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
