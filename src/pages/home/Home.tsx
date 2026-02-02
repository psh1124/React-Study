import { useMemo, useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { useAuth } from "../../context/useAuth";
import { MOCK_POSTS, type Post } from "../../data/mockData";
import "./Home.css";

function Home() {
  const { user, isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<"latest" | "likes">("latest");
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  //mockData 수정하고 버전 바꿔야 바로 반영됨(localStorage 수동 비우기 불필요)
  const DATA_VERSION = "v2";

  const [posts, setPosts] = useState<Post[]>(() => {
    const savedVersion = localStorage.getItem("data_version");
    const savedPosts = localStorage.getItem("blog_posts");

    if (savedVersion === DATA_VERSION && savedPosts) {
      return JSON.parse(savedPosts);
    }

    localStorage.setItem("data_version", DATA_VERSION);
    return MOCK_POSTS;
  });

  useEffect(() => {
    localStorage.setItem("blog_posts", JSON.stringify(posts));

    const likedIds = posts
      .filter((post) => post.isLiked)
      .map((post) => post.id);
    localStorage.setItem("my_liked_ids", JSON.stringify(likedIds));
  }, [posts]);

  const categories = [
    "전체",
    "React",
    "AI",
    "TypeScript",
    "Security",
    "Design",
    "Backend",
  ];

  const handleToggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    );
  };

  const processedPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "전체" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLiked = showOnlyLiked ? post.isLiked : true;

      return matchesCategory && matchesSearch && matchesLiked;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.likes - a.likes;
    });
  }, [posts, searchTerm, selectedCategory, sortBy, showOnlyLiked]);

  return (
    <Container>
      <header className="home-header">
        <h1>기술 포스트</h1>
        {isLoggedIn && user ? (
          <p className="welcome-msg">
            안녕하세요, {user.nickname}님! 오늘의 추천 글입니다.
          </p>
        ) : (
          <p className="welcome-msg">로그인하고 더 많은 기능을 이용해보세요.</p>
        )}
      </header>

      <div className="home-stats">
        <div className="stat-badge">
          전체 포스트 <strong>{posts.length}</strong>
        </div>
        <div className="stat-badge">
          검색 결과 <strong>{processedPosts.length}</strong>
        </div>
      </div>

      <section className="home-controls">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="control-row">
          <div className="search-bar">
            <label htmlFor="search-input" className="visually-hidden">
              포스트 검색
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="주제나 내용을 검색해보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="liked-filter">
            <label htmlFor="liked-checkbox">
              <input
                id="liked-checkbox"
                type="checkbox"
                checked={showOnlyLiked}
                onChange={(e) => setShowOnlyLiked(e.target.checked)}
              />
              <span className="filter-label">❤️ 내 좋아요 목록</span>
            </label>
          </div>

          <div className="sort-options">
            <button
              className={`sort-btn ${sortBy === "latest" ? "active" : ""}`}
              onClick={() => setSortBy("latest")}>
              최신순
            </button>
            <button
              className={`sort-btn ${sortBy === "likes" ? "active" : ""}`}
              onClick={() => setSortBy("likes")}>
              인기순
            </button>
          </div>
        </div>
      </section>

      <div className="posts-grid">
        {processedPosts.length > 0 ? (
          processedPosts.map((post) => (
            <Card
              key={post.id}
              {...post}
              isLiked={post.isLiked}
              onLike={() => handleToggleLike(post.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            {showOnlyLiked && !searchTerm ? (
              <div className="empty-message">
                <span className="empty-icon">❤️</span>
                <p>아직 좋아요를 누른 포스트가 없습니다.</p>
                <p className="sub-text">관심 있는 글에 하트를 눌러보세요!</p>
              </div>
            ) : (
              <div className="empty-message">
                <span className="empty-icon">🔍</span>
                <p>검색 결과가 없습니다.</p>
                <p className="sub-text">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Home;
