# 🚀 React-Study

> **React + TypeScript + Vite 기반의 사용자 인증 및 게시판 시스템 학습 프로젝트** > Context API와 LocalStorage를 활용하여 실제 서버 없이도 완벽한 인증 아키텍처와 데이터 영속성을 구현합니다.

---

## 📌 프로젝트 개요

단순히 기능을 만드는 것을 넘어, **관심사 분리(SoC)**를 통한 확장 가능한 폴더 구조와 유지보수가 용이한 React 개발 패턴을 학습하기 위해 설계되었습니다.

### 🎯 학습 포인트
- **인증 아키텍처**: 회원가입 → 로그인 → 마이페이지 → 회원탈퇴의 End-to-End 흐름.
- **상태 관리**: Context API를 활용한 전역 세션 및 로딩 상태 관리.
- **데이터 영속성**: `localStorage`를 활용한 데이터 지속성 확보.
- **라우트 가드**: `PublicRoute`, `ProtectedRoute` 기반의 페이지 접근 제어.

---

## 🛠 기술 스택

### Core
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Ecosystem
- **Routing**: `React Router v7`
- **Feedback**: `React-Toastify`, `React-Icons`
- **Styling**: `Pure CSS` (반응형 설계)

---

## 🔥 주요 기능

### 1. 인증 시스템 (Authentication)
- **유효성 검증**: Touched 패턴을 활용한 실시간 이메일/비밀번호 검증.
- **비밀번호 토글**: `usePasswordToggle` 훅으로 가시성 제어.
- **세션 유지**: 서비스 접속 시 스토리지 기반 자동 로그인 수행.

### 2. 게시판 시스템 (Content Management)
- **CRUD 로직**: `postService` 클래스로 분리된 게시글 처리 인프라.
- **필터링 & 검색**: 카테고리별 필터 및 제목 검색 (`useMemo` 최적화).
- **좋아요**: 포스트별 독립적 좋아요 상태 및 카운트 관리.

---

## 🗂 프로젝트 구조 (System Architecture)

```bash
src/
├── components/          # 재사용 가능한 UI 원자 컴포넌트
├── context/             # 전역 상태 관리 (Auth, Loading)
├── hooks/               # 비즈니스 로직 캡슐화 (Validation, Posts, Likes)
├── services/            # 데이터 접근 계층 (Storage CRUD 로직을 분리하여 외부 의존성 최소화)
├── mocks/               # API Mocking (서버 없이도 비동기 인증 흐름을 독립적으로 테스트)
├── constants/           # 매직 넘버 및 메시지 관리
├── pages/               # 라우트 단위 페이지 컴포넌트
└── utils/               # 독립적인 헬퍼 함수
```

---

## 🔐 데이터 흐름 (Auth Flow)
1. **[입력]** `LoginForm` 데이터 입력 및 실시간 유효성 검증
2. **[요청]** `mockLogin` 비동기 호출 (Promise 기반 시뮬레이션)
3. **[처리]** `localStorage` 데이터 대조 후 유저 객체 반환
4. **[동기화]** `AuthContext` 상태 업데이트 및 세션 저장
5. **[가드]** `ProtectedRoute`가 로그인 상태를 감지하여 페이지 접근 허용

---

## 🎯 기술적 결정

- **Mock 인증 사용이유?**
  
  실제 백엔드가 구축되기 전에도 프론트엔드 개발자가 **독립적으로 전체 인증 흐름(가입-로그인-탈퇴)을 테스트**하고, 아키텍처를 설계하는 경험을 하기 위해 도입했습니다.
  
- **왜 Service 레이어를 별도로 두었는지?**
  
  UI 컴포넌트가 데이터 저장 방식(LocalStorage인지 실제 DB인지)에 의존하지 않게 하기 위해서입니다. 이를 통해 **인프라 교체에 유연한 코드**를 작성하고자 했습니다.
  
- **왜 Context API를 선택했는지?**
  
  로그인 정보는 앱 전체에서 광범위하게 쓰이지만 변경 빈도가 낮습니다. 따라서 외부 라이브러리(Redux 등) 없이 React 내장 기능만으로 **가볍고 효율적으로 상태를 전파**하기 위해 선택했습니다.

---

## 🚀 설치 및 실행

```bash
git clone https://github.com/psh1124/React-Study.git
cd React-Study
npm install
npm run dev

```

---

## 📌 향후 작업 계획 (TODO)

이 프로젝트의 TODO 및 향후 작업 계획은 GitHub Projects에서 관리하고 있습니다.
아래 링크에서 현재 진행 중인 이슈와 계획을 확인할 수 있습니다.

- GitHub Projects: https://github.com/psh1124/React-Study/projects
