# React-Study 프로젝트 완전 분석 문서

> **React + TypeScript + Vite 기반의 사용자 인증 흐름 학습 프로젝트**  
> Context API, localStorage, Mock API를 활용한 전역 상태 관리 및 인증 시스템 구현

---

## 📑 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [핵심 아키텍처](#4-핵심-아키텍처)
5. [주요 기능 상세](#5-주요-기능-상세)
6. [컴포넌트 분석](#6-컴포넌트-분석)
7. [상태 관리 시스템](#7-상태-관리-시스템)
8. [인증 시스템](#8-인증-시스템)
9. [라우팅 & 가드](#9-라우팅--가드)
10. [유효성 검증](#10-유효성-검증)
11. [스타일링 전략](#11-스타일링-전략)
12. [설치 및 실행](#12-설치-및-실행)

---

## 1. 프로젝트 개요

### 1.1 목적
- React + TypeScript 기반 인증 흐름 구조 이해
- Context API를 활용한 전역 로그인 상태 관리
- Mock API를 통한 로그인/회원가입 시뮬레이션
- 새로고침 이후에도 유지되는 로그인 상태 구현
- 컴포넌트 역할 분리 및 파일 구조 정리

### 1.2 주요 특징
- ✅ **완전한 인증 흐름**: 회원가입 → 로그인 → 마이페이지 → 회원탈퇴
- ✅ **전역 상태 관리**: Context API + localStorage 동기화
- ✅ **라우트 가드**: PublicRoute, ProtectedRoute로 접근 제어
- ✅ **실시간 유효성 검증**: Touched 기반 에러 표시
- ✅ **반응형 디자인**: clamp() 함수 활용한 유동적 UI
- ✅ **Toast 알림**: react-toastify로 사용자 피드백
- ✅ **게시글 시스템**: 카테고리 필터링, 검색, 좋아요 기능

---

## 2. 기술 스택

### 2.1 Core
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "~5.9.3",
  "vite": "^7.2.4"
}
```

### 2.2 라이브러리
| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| `react-router-dom` | ^7.12.0 | 페이지 라우팅 |
| `react-toastify` | ^11.0.5 | Toast 알림 |
| `react-icons` | ^5.5.0 | 아이콘 사용 |

### 2.3 개발 도구
```json
{
  "eslint": "^9.39.1",
  "typescript-eslint": "^8.46.4",
  "@vitejs/plugin-react": "^5.1.1"
}
```

---

## 3. 프로젝트 구조

```
src/
├── components/              # 재사용 가능한 UI 컴포넌트
│   ├── AuthCard/           # 인증 폼 카드
│   ├── AuthLayout/         # 인증 페이지 레이아웃
│   ├── Button/             # 공통 버튼
│   ├── Card/               # 게시글 카드
│   ├── Container/          # 페이지 컨테이너
│   ├── Header/             # 헤더 네비게이션
│   ├── InputField/         # 공통 입력 필드
│   └── Route/              # 라우트 가드
│       ├── PublicRoute.tsx
│       └── ProtectedRoute.tsx
│
├── context/                # 전역 상태 관리
│   ├── AuthContext.tsx     # Context 정의
│   ├── AuthProvider.tsx    # Provider 구현
│   └── useAuth.ts          # Context 접근 훅
│
├── hooks/                  # 커스텀 훅
│   ├── useAuthValidation.ts   # 폼 유효성 검증
│   ├── usePasswordToggle.ts   # 비밀번호 표시/숨김
│   └── usePostLikes.ts        # 게시글 좋아요
│
├── mocks/                  # Mock API
│   ├── auth.ts             # 인증 API (login, signup, withdraw)
│   └── users.ts            # 사용자 데이터 관리
│
├── pages/                  # 페이지 컴포넌트
│   ├── home/              # 홈 (게시글 목록)
│   ├── Auth/
│   │   ├── login/         # 로그인
│   │   └── signup/        # 회원가입
│   └── mypage/            # 마이페이지
│
├── constants/              # 상수
│   └── messages.ts         # 메시지 상수
│
├── App.tsx                 # 앱 진입점 (라우팅)
├── main.tsx               # React 렌더링
└── index.css              # 전역 스타일
```

---

## 4. 핵심 아키텍처

### 4.1 인증 흐름 다이어그램

```
┌─────────────┐
│  회원가입    │
│ (Signup)    │
└──────┬──────┘
       │ mockSignup(email, password, nickname)
       │ ↓
       │ localStorage.mock_users에 저장
       │ ↓
       │ 완료 → /login으로 이동
       ↓
┌─────────────┐
│   로그인     │
│  (Login)    │
└──────┬──────┘
       │ mockLogin(email, password)
       │ ↓
       │ mock_users에서 조회
       │ ↓
       │ 성공 → AuthContext.login(user)
       │ ↓
       │ localStorage.user에 저장
       │ ↓
       │ /mypage로 이동
       ↓
┌─────────────┐
│  마이페이지  │
│  (MyPage)   │
└──────┬──────┘
       │ ProtectedRoute 가드
       │ ↓
       │ 사용자 정보 표시
       │ ↓
       │ 회원탈퇴 버튼
       │ ↓
       │ mockWithdraw(userId)
       │ ↓
       │ logout() → /로 이동
       └────────────
```

### 4.2 상태 관리 흐름

```
┌──────────────────────────────────────┐
│         AuthProvider                  │
│  ┌────────────────────────────────┐  │
│  │  useState<User | null>         │  │
│  │  ↓                              │  │
│  │  초기값: localStorage.user     │  │
│  └────────────────────────────────┘  │
│                                       │
│  login(user) → setUser + localStorage│
│  logout() → setUser(null) + remove   │
│                                       │
│  제공:                                │
│  - isLoggedIn: boolean               │
│  - user: User | null                 │
│  - login: (user) => void             │
│  - logout: () => void                │
└───────────────┬───────────────────────┘
                │
        ┌───────┴────────┐
        │   useAuth()    │
        │ (커스텀 훅)     │
        └───────┬────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐  ┌───▼───┐  ┌───▼────┐
│Header │  │MyPage │  │Routes  │
└───────┘  └───────┘  └────────┘
```

---

## 5. 주요 기능 상세

### 5.1 회원가입 (Signup)

#### 입력 필드
- **닉네임**: 필수 입력
- **이메일**: 형식 검증 (정규식)
- **비밀번호**: 최소 8자
- **비밀번호 확인**: 일치 여부 확인
- **약관 동의**: 체크박스 필수

#### 유효성 검증
```typescript
validateSignupForm(email, nickname, password, passwordConfirm)
  - getEmailError: 이메일 형식 체크
  - getNicknameError: 빈 값 체크
  - getPasswordError: 최소 8자 체크
  - getPasswordConfirmError: 일치 여부 체크
  - getTermsError: 약관 동의 체크
```

#### 처리 흐름
1. 폼 제출 → `handleSubmit`
2. `mockSignup(email, password, nickname)` 호출
3. 이메일 중복 체크
4. 성공 시 `mock_users`에 저장
5. Toast 알림 → `/login`으로 이동

---

### 5.2 로그인 (Login)

#### 입력 필드
- **이메일**: 형식 검증
- **비밀번호**: 최소 8자

#### 비밀번호 토글
```typescript
usePasswordToggle()
  - isVisible: boolean
  - toggle: () => void
  - type: "password" | "text"
```

#### 처리 흐름
1. 폼 제출 → `handleLogin`
2. `mockLogin(email, password)` 호출
3. `mock_users`에서 일치하는 계정 찾기
4. 성공 → `login(user)` → Context 업데이트
5. `localStorage.user`에 저장
6. Toast 알림 → 자동으로 `/mypage`로 리다이렉트

---

### 5.3 마이페이지 (MyPage)

#### 표시 정보
- **기본 정보**: 닉네임, 이메일
- **활동 통계**: 작성 글 0, 댓글 0 (향후 확장 가능)

#### 회원 탈퇴 기능
```typescript
handleWithdrawClick()
  - toast.warn으로 확인 모달 표시
  - "탈퇴" 버튼 클릭 → executeWithdraw()
  - mockWithdraw(userId) → mock_users에서 제거
  - logout() → localStorage 정리
  - navigate("/", { replace: true })
```

---

### 5.4 홈 페이지 (Home)

#### Mock 게시글 데이터
```typescript
interface Post {
  id: number;
  category: string;        // React, TypeScript, Auth, Design, Backend
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}
```

#### 필터링 & 검색
```typescript
useMemo(() => {
  return MOCK_POSTS.filter(post => {
    const matchesCategory = 
      selectedCategory === "전체" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}, [searchTerm, selectedCategory]);
```

#### 좋아요 기능
```typescript
usePostLike(id, initialLikes)
  - localStorage.likedPosts: [1, 3, 5] (좋아요한 게시글 ID)
  - localStorage.postLikeCounts: { 1: 43, 3: 57 }
  - toggleLike() → localStorage 업데이트
```

---

## 6. 컴포넌트 분석

### 6.1 레이아웃 컴포넌트

#### Container
```typescript
// 용도: 페이지 전체를 감싸는 패딩 컨테이너
<Container>
  {children}
</Container>

// CSS
.container {
  padding: 2rem 10rem;  // 좌우 여백
  box-sizing: border-box;
}
```

#### AuthLayout
```typescript
interface AuthLayoutProps {
  children: React.ReactNode;
  align?: "center" | "top";        // 수직 정렬
  variant?: "login" | "signup";    // 페이지별 높이 조정
}

// 사용 예시
<AuthLayout align="center" variant="login">
  <AuthCard>...</AuthCard>
</AuthLayout>
```

#### AuthCard
```typescript
// 용도: 인증 폼을 감싸는 카드 UI
// 특징: 
//   - 반응형 너비 (clamp(22rem, 90vw, 28rem))
//   - 그림자 효과
//   - 둥근 모서리
```

---

### 6.2 UI 컴포넌트

#### Button
```typescript
interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger";    // primary: 파랑, danger: 빨강
}

// 사용 예시
<Button type="submit" disabled={!isFormValid}>
  로그인
</Button>

<Button variant="danger" onClick={handleWithdraw}>
  회원 탈퇴
</Button>
```

#### InputField
```typescript
interface InputFieldProps {
  id?: string;
  name?: string;
  className: string;
  type?: string;               // text, email, password
  placeholder?: string;
  value: string;
  autoComplete?: string;
  onChange: (e) => void;
  onBlur?: () => void;        // Touched 상태 관리
}

// 사용 예시
<InputField
  id="email"
  type="email"
  autoComplete="email"
  placeholder="이메일을 입력하세요"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setEmailTouched(true)}
/>
```

#### Card
```typescript
interface CardProps {
  id: number;
  title: string;
  content: string;
  category?: string;
  author?: string;
  date?: string;
  likes?: number;
  comments?: number;
  onClick?: () => void;
}

// 특징:
//   - 좋아요 버튼 (usePostLike 훅 사용)
//   - 호버 애니메이션 (translateY + shadow)
//   - 2줄 말줄임표 (-webkit-line-clamp: 2)
```

---

### 6.3 헤더 (Header)

#### 구조
```typescript
<header className="header">
  <div className="logo">
    <NavLink to="/">React Study</NavLink>
  </div>
  
  <nav className="nav">
    <NavLink to="/">홈</NavLink>
    
    {isLoggedIn ? (
      <>
        <NavLink to="/mypage">{user?.nickname}님</NavLink>
        <button onClick={handleLogout}>로그아웃</button>
      </>
    ) : (
      <>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
      </>
    )}
  </nav>
</header>
```

#### CSS 변수
```css
:root {
  --header-height: 3rem;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
```

---

## 7. 상태 관리 시스템

### 7.1 AuthContext

```typescript
// src/context/AuthContext.tsx

export interface User {
  id: number;
  email: string;
  nickname?: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;      // !!user
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
```

### 7.2 AuthProvider

```typescript
// src/context/AuthProvider.tsx

export function AuthProvider({ children }) {
  // 초기값: localStorage에서 복원
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### 7.3 useAuth 훅

```typescript
// src/context/useAuth.ts

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

// 사용 예시
const { isLoggedIn, user, login, logout } = useAuth();
```

---

## 8. 인증 시스템

### 8.1 Mock Users 관리

```typescript
// src/mocks/users.ts

export interface MockUser {
  id: number;
  email: string;
  password: string;
  nickname: string;
}

const STORAGE_KEY = "mock_users";

export function getMockUsers(): MockUser[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
```

### 8.2 Mock 인증 API

```typescript
// src/mocks/auth.ts

// 로그인
export function mockLogin(email: string, password: string) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
        return;
      }

      resolve({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    }, 500);  // 실제 API 시뮬레이션
  });
}

// 회원가입
export function mockSignup(email: string, password: string, nickname: string) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();

      // 이메일 중복 체크
      if (users.some(u => u.email === email)) {
        reject(new Error("이미 사용 중인 이메일입니다."));
        return;
      }

      // 새 사용자 생성
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        email,
        password,
        nickname,
      };

      users.push(newUser);
      saveMockUsers(users);

      resolve({
        id: newUser.id,
        email: newUser.email,
        nickname: newUser.nickname,
      });
    }, 500);
  });
}

// 회원탈퇴
export function mockWithdraw(userId: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const users = getMockUsers();
      const filtered = users.filter(u => u.id !== userId);
      saveMockUsers(filtered);
      resolve();
    }, 500);
  });
}
```

---

## 9. 라우팅 & 가드

### 9.1 라우팅 구조

```typescript
// src/App.tsx

<BrowserRouter>
  <Header />
  <Routes>
    {/* 공개 페이지 */}
    <Route path="/" element={<Home />} />

    {/* 비로그인 전용 (PublicRoute) */}
    <Route path="login" element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    } />
    
    <Route path="signup" element={
      <PublicRoute>
        <Signup />
      </PublicRoute>
    } />

    {/* 로그인 전용 (ProtectedRoute) */}
    <Route path="mypage" element={
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    } />
  </Routes>
  
  <ToastContainer />
</BrowserRouter>
```

### 9.2 PublicRoute (비로그인 전용)

```typescript
// src/components/Route/PublicRoute.tsx

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/mypage", { replace: true });  // 로그인 상태면 마이페이지로
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return null;

  return <>{children}</>;
}
```

### 9.3 ProtectedRoute (로그인 전용)

```typescript
// src/components/Route/ProtectedRoute.tsx

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error(AUTH_MESSAGES.LOGIN_REQUIRED, {
        toastId: "login-required",  // 중복 방지
      });
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;
  
  return <>{children}</>;
}
```

---

## 10. 유효성 검증

### 10.1 검증 함수들

```typescript
// src/hooks/useAuthValidation.ts

// 이메일 검증
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getEmailError = (email: string, touched: boolean): string | null => {
  if (!touched) return null;
  if (!email) return "이메일을 입력해주세요.";
  if (!emailRegex.test(email)) return "이메일 형식이 올바르지 않습니다.";
  return null;
};

// 닉네임 검증
export const getNicknameError = (nickname: string, touched: boolean): string | null => {
  if (!touched) return null;
  if (!nickname) return "닉네임을 입력해주세요.";
  return null;
};

// 비밀번호 검증
export const getPasswordError = (
  password: string,
  touched: boolean,
  minLength = 8
): string | null => {
  if (!touched) return null;
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < minLength) return `비밀번호는 ${minLength}자리 이상입니다.`;
  return null;
};

// 비밀번호 확인 검증
export const getPasswordConfirmError = (
  password: string,
  passwordConfirm: string,
  touched: boolean
): string | null => {
  if (!touched) return null;
  if (!passwordConfirm) return "비밀번호 확인을 입력해주세요.";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return null;
};

// 약관 동의 검증
export const getTermsError = (agreed: boolean, touched: boolean): string | null => {
  if (!touched) return null;
  if (!agreed) return "약관에 동의해주세요.";
  return null;
};
```

### 10.2 폼 전체 검증

```typescript
// 로그인 폼
export const validateLoginForm = (email: string, password: string) => {
  return !getEmailError(email, true) && !getPasswordError(password, true);
};

// 회원가입 폼
export const validateSignupForm = (
  email: string,
  nickname: string,
  password: string,
  passwordConfirm: string
) => {
  return (
    !getEmailError(email, true) &&
    !getNicknameError(nickname, true) &&
    !getPasswordError(password, true) &&
    !getPasswordConfirmError(password, passwordConfirm, true)
  );
};
```

### 10.3 Touched 패턴

```typescript
// LoginForm.tsx 예시

const [email, setEmail] = useState("");
const [emailTouched, setEmailTouched] = useState(false);

const emailError = getEmailError(email, emailTouched);

<InputField
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setEmailTouched(true)}  // 포커스 아웃 시 touched 설정
/>

{emailError && (
  <p className="error">
    <IoIosWarning /> {emailError}
  </p>
)}
```

---

## 11. 스타일링 전략

### 11.1 반응형 디자인 (clamp 함수)

```css
/* 폰트 크기 */
font-size: clamp(0.95rem, 2.5vw, 1.4rem);
/*           최소값   가변값   최대값  */

/* 패딩 */
padding: clamp(1.5rem, 4vw, 2.5rem);

/* 너비 */
max-width: clamp(22rem, 90vw, 28rem);

/* 간격 */
gap: clamp(0.75rem, 3vw, 2rem);
```

### 11.2 CSS 변수

```css
:root {
  --header-height: 3rem;
}

/* 사용 */
.auth-layout {
  height: calc(100vh - var(--header-height));
}

.toast-container {
  top: calc(var(--header-height) + 30px);
}
```

### 11.3 애니메이션 & 트랜지션

```css
/* 카드 호버 */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.08);
}

/* 버튼 호버 */
.nav-item {
  transition: transform 0.15s ease, color 0.15s ease;
}

.nav-item:hover {
  color: #00aa00;
  transform: scale(1.05);
}

/* 좋아요 버튼 */
.like-btn:active {
  transform: scale(1.2);
}
```

### 11.4 텍스트 말줄임표

```css
/* 1줄 말줄임표 */
.card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 2줄 말줄임표 */
.card__content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
```

---

## 12. 설치 및 실행

### 12.1 설치

```bash
git clone https://github.com/psh1124/React-Study.git
cd React-Study
npm install
```

### 12.2 실행

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

### 12.3 접속

```
http://localhost:5173
```

---

## 13. 주요 학습 포인트

### 13.1 Context API 활용
- ✅ Context 정의 (AuthContext)
- ✅ Provider 구현 (AuthProvider)
- ✅ 커스텀 훅 제작 (useAuth)
- ✅ localStorage 동기화

### 13.2 라우팅 전략
- ✅ React Router DOM v7 사용
- ✅ 라우트 가드 구현 (Public/Protected)
- ✅ useNavigate로 프로그래매틱 네비게이션
- ✅ NavLink의 active 상태 활용

### 13.3 폼 처리
- ✅ Controlled Components 패턴
- ✅ Touched 기반 에러 표시
- ✅ 실시간 유효성 검증
- ✅ 비밀번호 표시/숨김 토글

### 13.4 컴포넌트 설계
- ✅ 재사용 가능한 UI 컴포넌트 분리
- ✅ Props 인터페이스 정의 (TypeScript)
- ✅ children 패턴 활용
- ✅ CSS 모듈화 (컴포넌트별 CSS 파일)

### 13.5 상태 관리
- ✅ useState로 로컬 상태 관리
- ✅ useMemo로 성능 최적화
- ✅ localStorage 활용 (지속성)
- ✅ 커스텀 훅으로 로직 분리

---

## 14. 향후 확장 가능성

### 14.1 현재 TODO
- [ ] 실제 백엔드 API 연동
- [ ] JWT 토큰 기반 인증
- [ ] 게시글 CRUD 구현
- [ ] 댓글 시스템
- [ ] 프로필 이미지 업로드
- [ ] 비밀번호 찾기/재설정

### 14.2 개선 아이디어
- [ ] React Query로 서버 상태 관리
- [ ] Zustand 또는 Recoil로 전역 상태 관리
- [ ] React Hook Form으로 폼 처리 개선
- [ ] Zod로 스키마 검증
- [ ] Storybook으로 컴포넌트 문서화
- [ ] Vitest로 단위 테스트
- [ ] Playwright로 E2E 테스트

---

## 15. 참고 자료

### 15.1 공식 문서
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org)
- [Vite 공식 문서](https://vitejs.dev)
- [React Router 공식 문서](https://reactrouter.com)

### 15.2 프로젝트 링크
- GitHub: https://github.com/psh1124/React-Study
- GitHub Projects: https://github.com/psh1124/React-Study/projects

---

## 16. 라이선스

MIT License

---

**작성일**: 2026-01-28  
**프로젝트 버전**: 0.0.0  
**문서 버전**: 1.0.0
