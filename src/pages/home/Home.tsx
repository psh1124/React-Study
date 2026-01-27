import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { useAuth } from "../../context/useAuth";
import "./Home.css";
import { useMemo, useState } from "react";

interface Post {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    category: "React",
    title: "성능 최적화: useMemo와 useCallback 언제 써야 할까?",
    content:
      "무분별한 최적화는 오히려 성능을 저하시킬 수 있습니다. 실제 벤치마크 결과와 함께 효율적인 사용 시점을 알아봅니다.",
    author: "리액트장인",
    date: "2024.03.22",
    likes: 42,
    comments: 12,
  },
  {
    id: 2,
    category: "TypeScript",
    title: "any 타입을 지양하고 Unknown 사용하기",
    content:
      "타입 안전성을 지키면서도 유연하게 코드를 짜는 방법! unknown 타입과 타입 가드의 조합을 살펴봅니다.",
    author: "타입수호자",
    date: "2024.03.21",
    likes: 28,
    comments: 5,
  },
  {
    id: 3,
    category: "Auth",
    title: "JWT 인증 방식과 리프레시 토큰의 흐름",
    content:
      "프론트엔드에서 로그인 상태를 안전하게 유지하는 방법, 로컬 스토리지와 쿠키 중 어디가 더 안전할까요?",
    author: "보안전문가",
    date: "2024.03.20",
    likes: 56,
    comments: 18,
  },
  {
    id: 4,
    category: "Design",
    title: "px 대신 rem을 사용해야 하는 진짜 이유",
    content:
      "반응형 웹과 웹 접근성을 위한 상대 단위 rem! 디자인 시스템 구축 시 고려해야 할 점들을 정리했습니다.",
    author: "CSS마스터",
    date: "2024.03.19",
    likes: 34,
    comments: 7,
  },
  {
    id: 5,
    category: "React",
    title: "React Hook Form으로 폼 핸들링 정복하기",
    content:
      "복잡한 회원가입 폼, 유효성 검사 로직을 깔끔하게 유지하는 비결. 비제어 컴포넌트의 장점을 활용해 보세요.",
    author: "폼빌더",
    date: "2024.03.18",
    likes: 21,
    comments: 3,
  },
  {
    id: 6,
    category: "Backend",
    title: "프론트엔드를 위한 가짜 API, MSW 활용법",
    content:
      "백엔드 API가 완성되기 전까지 기다리지 마세요. Mock Service Worker로 완벽한 개발 환경 구축하기.",
    author: "워커홀릭",
    date: "2024.03.17",
    likes: 15,
    comments: 4,
  },
];

function Home() {
  const { user, isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "React", "TypeScript", "Design", "Backend"];

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "전체" || post.category === selectedCategory;
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);
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
          전체 포스트 <strong>{MOCK_POSTS.length}</strong>
        </div>
        <div className="stat-badge">
          검색 결과 <strong>{filteredPosts.length}</strong>
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

        <div className="search-bar">
          <input
            id="search"
            type="text"
            placeholder="주제나 내용을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Card key={post.id} {...post} />)
        ) : (
          <div className="empty-state">
            <span className="icon">🔍</span>
            <p>찾으시는 게시글이 없어요. 다른 키워드로 검색해보세요!</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("전체");
              }}>
              초기화
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Home;
