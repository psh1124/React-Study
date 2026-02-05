import { useAuth } from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { notify } from "../../utils/toastService";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import "./Home.css";

function Home() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const {
    posts,
    allPostsCount,
    searchTerm,
    selectedCategory,
    sortBy,
    showOnlyLiked,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setShowOnlyLiked,
    actions,
  } = usePosts(user, isLoggedIn);

  const categories = [
    "전체",
    "React",
    "AI",
    "TypeScript",
    "Security",
    "Design",
    "Backend",
  ];

  return (
    <Container>
      <header className="home-header">
        <h1>기술 포스트</h1>
        <p className="welcome-msg">
          {isLoggedIn && user
            ? `안녕하세요, ${user.nickname}님! 오늘의 추천 글입니다.`
            : "로그인하고 더 많은 기능을 이용해보세요."}
        </p>
      </header>

      <div className="home-stats">
        <div className="stat-badge">
          전체 <strong>{allPostsCount}</strong>
        </div>
        <div className="stat-badge">
          결과 <strong>{posts.length}</strong>
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
            <input
              id="search-bar"
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="control-actions">
            {isLoggedIn && (
              <div className="liked-filter">
                <label>
                  <input
                    id="liked-filter"
                    type="checkbox"
                    checked={showOnlyLiked}
                    onChange={(e) => setShowOnlyLiked(e.target.checked)}
                  />
                  <span className="filter-label">❤️ 내 좋아요</span>
                </label>
              </div>
            )}

            <div className="sort-options">
              {(["latest", "likes"] as const).map((type) => (
                <button
                  key={type}
                  className={`sort-btn ${sortBy === type ? "active" : ""}`}
                  onClick={() => setSortBy(type)}>
                  {type === "latest" ? "최신순" : "인기순"}
                </button>
              ))}
            </div>

            <button
              className={`write-btn ${!isLoggedIn ? "locked" : ""}`}
              onClick={() =>
                isLoggedIn ? navigate("/write") : notify.requireLogin()
              }>
              새 글 작성 ✍️
            </button>
          </div>
        </div>
      </section>

      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              {...post}
              isLiked={post.likedBy?.includes(user?.nickname || "")}
              isMine={isLoggedIn && user?.nickname === post.author}
              onLike={() => actions.toggleLike(post.id)}
              onDelete={() => {
                console.log("4. Home에서 actions.deletePost 호출!");
                actions.deletePost(post.id);
              }}
            />
          ))
        ) : (
          <div className="empty-state">... 검색 결과 없음 ...</div>
        )}
      </div>
    </Container>
  );
}

export default Home;
