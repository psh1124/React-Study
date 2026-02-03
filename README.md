# React-Study

React + TypeScript + Vite 기반의 **사용자 인증 흐름 학습 프로젝트**입니다.  
폼 유효성 검증부터 **Mock 기반 로그인/회원가입**,  
**Context API + localStorage를 활용한 전역 로그인 상태 관리**까지 구현했습니다.

---

## 📌 프로젝트 목적

- React + TypeScript 기반 인증 흐름 구조 이해
- Context API를 활용한 전역 로그인 상태 관리
- Mock API를 통한 로그인 / 회원가입 시뮬레이션
- 새로고침 이후에도 유지되는 로그인 상태 구현
- 컴포넌트 역할 분리 및 파일 구조 정리

---

## 🛠 기술 스택

```bash
React 19
TypeScript
Vite
React Router DOM
Context API
localStorage
CSS
```

## 🔥 주요 기능

### 1. 회원가입 (Mock)
- 이메일 / 비밀번호 / 닉네임 입력
- 이메일 형식 검증
- 비밀번호 최소 길이 검증
- 비밀번호 확인 일치 여부 검증
- 약관 동의 필수 체크
- localStorage(mock_users)에 사용자 저장

### 2. 로그인 (Mock)
- 이메일 / 비밀번호 입력
- 입력값 유효성 검증
- mock_users에서 계정 확인
- 로그인 성공 시 Context 상태 업데이트
- localStorage에 로그인 사용자 저장

### 3. 전역 로그인 상태 관리
- AuthContext / AuthProvider 구조
- isLoggedIn, user, login, logout 전역 공유
- useAuth 커스텀 훅 제공

### 4. 로그인 유지 기능
- 웹 시작할때 localStorage user 값 복원
- 새로고침, 페이지 이동 시에도 로그인 상태 유지

### 5. 헤더 UI분기
- 로그인 상태
  - 닉네임 표시
  - 로그아웃
  - 회원탈퇴
- 비로그인 상태
  - 로그인 / 회원가입 메뉴 노출

---

## 🔐 로그인 처리 흐름

```bash
LoginForm
  ↓
handleLogin()
  ↓
mockLogin(email, password)
  ↓
localStorage(mock_users) 조회
  ↓
성공 → { id, email, nickname }
  ↓
login(user)
  ↓
AuthContext 상태 업데이트
  ↓
Header / Home 에서 로그인 상태 반영
```

---

## 인증 구조 요약

```bash
mock_users      : 가입된 사용자 목록
mockLogin       : 로그인 인증 Mock 함수
mockSignup      : 회원가입 Mock 함수
mockWithdraw    : 회원탈퇴 Mock 함수
AuthContext     : 전역 인증 상태 정의
AuthProvider    : 상태 + localStorage 동기화
useAuth         : Context 접근용 훅
```

---

## 🗂 폴더 구조

```bash
src/
├─ components/
│ ├─ Header/
│ ├─ InputField/
│ └─ Button/
├─ context/
│ ├─ AuthContext.tsx
│ ├─ AuthProvider.tsx
│ └─ useAuth.ts
├─ hooks/
│ └─ useAuthValidation.ts
├─ mocks/
│ ├─ auth.ts
│ └─ users.ts
├─ pages/
│ ├─ home/
│ ├─ login/
│ └─ signup/
├─ App.tsx
└─ main.tsx
```

---

## 🚀 설치 및 실행

```bash
git clone https://github.com/psh1124/React-Study.git
cd React-Study
npm install
npm run dev
```

---

## Mock 인증 사용한 이유

- 실제 API 없이 인증 흐름 학습
- 상태 관리 및 구조 설계에 집중
- 추후 실제 API 연동 시 교체 용이

---

## 🛠️ 사용된 주요 라이브러리

| 라이브러리 | 용도 |
|------------|------|
| `react` | UI 렌더링 |
| `react-dom` | DOM 렌더링 |
| `react-router-dom` | 페이지 라우팅 (BrowserRouter, Routes, Route 등) |
| `typescript` | 타입 안정성 추가 |
| `vite` | 개발 서버 및 빌드 도구 |
| `@types/react` | React 타입 정의 |
| `@types/react-dom` | React DOM 타입 정의 |
| `@types/react-router-dom` | React Router 타입 정의 |
| `react-icons` | 아이콘 사용 (eye, warning 등) |

---

## 📌 앞으로 할 작업

이 프로젝트의 TODO 및 향후 작업 계획은 GitHub Projects에서 관리하고 있습니다.  
아래 링크에서 현재 진행 중인 이슈와 계획을 확인할 수 있습니다.

- GitHub Projects: https://github.com/psh1124/React-Study/projects

---

## 🎯 참고

현재 리포지토리는 **학습용 프로젝트**입니다.  
폴더 명명, 컴포넌트 설계, 라우팅 구조 등을 스스로 계획하고 구현하면서 React 개발의 기본 패턴을 연습하기에 적합합니다.

---

## 📄 라이선스

MIT License (필요 시 적용)
