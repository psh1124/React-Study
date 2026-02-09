import { storage, STORAGE_KEYS } from "../constants/storage";

export interface Post {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  likedBy: string[];
  views: number;
}

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    category: "React",
    title: "React Compiler(React Forget) 도입 후기: 더 이상 useMemo는 없다",
    content:
      "리액트 컴파일러가 정식 채택되면서 수동 최적화가 필요 없어졌습니다. 실제 프로젝트에서 렌더링 성능이 30% 개선된 사례를 공유합니다.",
    author: "리액트러버",
    date: "2026.02.01",
    likes: 42,
    comments: 28,
    likedBy: [],
    views: 345,
  },
  {
    id: 2,
    category: "AI",
    title: "에이전틱 AI(Agentic AI)와 프론트엔드의 결합",
    content:
      "단순한 챗봇을 넘어 사용자의 복잡한 요구사항을 스스로 판단하고 실행하는 '에이전트'형 UI 설계가 2026년의 대세가 되었습니다.",
    author: "AI아키텍트",
    date: "2026.01.28",
    likes: 95,
    comments: 12,
    likedBy: [],
    views: 45,
  },
  {
    id: 3,
    category: "TypeScript",
    title: "TypeScript 5.x: 명시적 타입 정의가 줄어드는 이유",
    content:
      "더욱 강력해진 타입 추론 덕분에 코드는 간결해지고 안정성은 높아졌습니다. 'Satisfies' 연산자의 고급 활용법을 알아봅니다.",
    author: "타입마스터",
    date: "2026.01.25",
    likes: 67,
    comments: 5,
    likedBy: [],
    views: 35,
  },
  {
    id: 4,
    category: "Security",
    title: "서버 함수(Server Actions) 보안: 'use server'의 함정",
    content:
      "클라이언트에서 서버 로직을 직접 호출할 때 발생할 수 있는 데이터 노출 위협과 이를 방어하기 위한 최신 보안 패턴 가이드입니다.",
    author: "시큐리티킴",
    date: "2026.01.20",
    likes: 110,
    comments: 19,
    likedBy: [],
    views: 64,
  },
  {
    id: 5,
    category: "Design",
    title: "CSS Anchor Positioning: 팝오버와 툴팁 구현의 혁명",
    content:
      "자바스크립트 라이브러리 없이 순수 CSS만으로 복잡한 위치 지정 UI를 만드는 법. 이제 웹 성능을 깎아먹는 라이브러리와 작별하세요.",
    author: "스타일장인",
    date: "2026.01.18",
    likes: 82,
    comments: 14,
    likedBy: [],
    views: 43,
  },
  {
    id: 6,
    category: "Backend",
    title: "Edge Runtime에서 구동되는 데이터베이스의 진화",
    content:
      "사용자와 가장 가까운 곳에서 데이터를 처리하는 엣지 컴퓨팅 시대. 0.1초 미만의 지연 시간을 달성하는 풀스택 아키텍처 전략.",
    author: "풀스택커",
    date: "2026.01.15",
    likes: 54,
    comments: 7,
    likedBy: [],
    views: 834,
  },
  {
    id: 7,
    category: "React",
    title: "Next.js 16의 부분 사전 렌더링(PPR) 실무 적용",
    content:
      "정적 페이지의 속도와 동적 페이지의 유연성을 동시에 잡는 PPR 기능. 사용자별 맞춤 대시보드 최적화 성공기입니다.",
    author: "넥스트고수",
    date: "2026.01.12",
    likes: 121,
    comments: 32,
    likedBy: [],
    views: 100,
  },
  {
    id: 8,
    category: "AI",
    title: "로컬 LLM을 브라우저에서 실행하기: WebGPU의 활용",
    content:
      "서버 비용 걱정 없이 사용자 브라우저의 GPU를 이용해 온디바이스 AI를 구현하는 법. WebGPU API의 현재와 미래.",
    author: "웹딥러닝",
    date: "2026.01.08",
    likes: 88,
    comments: 21,
    likedBy: [],
    views: 53,
  },
  {
    id: 9,
    category: "Design",
    title: "디자인 토큰(Design Tokens)과 하드웨어 스펙의 연동",
    content:
      "기기별 주사율이나 디스플레이 밝기에 반응하는 적응형 디자인 시스템 구축법. 다크모드를 넘어선 개인화 경험.",
    author: "픽셀퍼펙트",
    date: "2026.01.05",
    likes: 43,
    comments: 3,
    likedBy: [],
    views: 23,
  },
  {
    id: 10,
    category: "Backend",
    title: "웹소켓(WebSocket)을 대체하는 HTTP/3 양방향 스트리밍",
    content:
      "더 빠르고 안정적인 실시간 통신을 위한 WebTransport 도입 전략. 채팅과 실시간 협업 툴의 성능 개선 비결.",
    author: "네트워크맨",
    date: "2026.01.02",
    likes: 76,
    comments: 11,
    likedBy: [],
    views: 531,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "컴포넌트깎는노인",
    content: "드디어 useMemo 지옥에서 탈출인가요? 기대되네요.",
    date: "2026.02.01",
  },
  {
    id: 2,
    postId: 1,
    author: "주니어개발자",
    content: "컴파일러가 알아서 해준다고 하니 코드가 훨씬 깔끔해질 것 같아요!",
    date: "2026.02.02",
  },
  {
    id: 3,
    postId: 1,
    author: "리액트러버",
    content: "실제로 써봤는데 진짜 편합니다. 꼭 도입해보세요.",
    date: "2026.02.02",
  },

  {
    id: 4,
    postId: 2,
    author: "미래지향",
    content: "이제 UI가 고정된 게 아니라 상황에 따라 변하겠군요.",
    date: "2026.01.29",
  },
  {
    id: 5,
    postId: 2,
    author: "인간지능",
    content: "에이전트가 판단 실수를 했을 때의 대응책도 궁금합니다.",
    date: "2026.01.30",
  },

  {
    id: 6,
    postId: 3,
    author: "애니금지",
    content: "Satisfies 연산자는 진짜 혁명입니다. 타입 추론이 너무 완벽해요.",
    date: "2026.01.26",
  },

  {
    id: 7,
    postId: 4,
    author: "화이트해커",
    content: "서버 함수 쓸 때 클라이언트 데이터 검증은 여전히 필수입니다!",
    date: "2026.01.21",
  },
  {
    id: 8,
    postId: 4,
    author: "시큐리티킴",
    content: "맞습니다. 편의성만큼 보안 위협도 늘어나는 법이죠.",
    date: "2026.01.22",
  },

  {
    id: 9,
    postId: 7,
    author: "넥스트고수",
    content: "PPR 쓰니까 LCP 성능이 비약적으로 좋아지더라고요.",
    date: "2026.01.13",
  },
  {
    id: 10,
    postId: 7,
    author: "풀스택커",
    content:
      "부분적으로 서스펜스 걸리는 게 사용자 경험에 정말 큰 도움이 됩니다.",
    date: "2026.01.14",
  },

  {
    id: 11,
    postId: 8,
    author: "웹딥러닝",
    content: "브라우저에서 직접 추론하니까 개인정보 보호 측면에서도 훌륭해요.",
    date: "2026.01.09",
  },

  {
    id: 12,
    postId: 10,
    author: "네트워크맨",
    content: "TCP 핸드셰이크가 없으니 초기 연결 속도가 압도적이네요.",
    date: "2026.01.03",
  },
  {
    id: 13,
    postId: 10,
    author: "인프라요정",
    content: "하지만 아직 방화벽 이슈가 있는 곳들이 있으니 주의해야 합니다.",
    date: "2026.01.04",
  },
];

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
}

export const getPosts = (): Post[] => {
  return storage.get<Post[]>(STORAGE_KEYS.POSTS, MOCK_POSTS);
};

export const savePosts = (posts: Post[]) => {
  storage.set(STORAGE_KEYS.POSTS, posts);
};

export const getComments = (): Comment[] => {
  return storage.get<Comment[]>(STORAGE_KEYS.COMMENTS, MOCK_COMMENTS);
};

export const saveComments = (comments: Comment[]) => {
  storage.set(STORAGE_KEYS.COMMENTS, comments);
};
