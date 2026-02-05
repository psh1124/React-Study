# 🚀 React-Study

> **React + TypeScript + Vite 기반의 사용자 인증 흐름 및 게시판 기능 학습 프로젝트** > Context API와 LocalStorage를 활용하여 백엔드 없이도 완벽한 인증 및 데이터 흐름을 시뮬레이션합니다.

---

## 📌 프로젝트 개요

이 프로젝트는 React 아키텍처의 핵심인 **관심사 분리(SoC)**와 **인증 상태 관리**를 깊이 있게 학습하기 위해 설계되었습니다. 단순히 기능을 만드는 것을 넘어, 확장 가능한 파일 구조와 재사용 가능한 컴포넌트 설계를 지향합니다.

### 🎯 주요 학습 포인트

- **인증 흐름**: 회원가입 → 로그인 → 마이페이지 → 회원탈퇴의 End-to-End 흐름 구현
- **전역 상태**: Context API를 활용하여 Prop Drilling 없이 로그인 상태 관리
- **지속성**: 새로고침 시에도 `localStorage`를 통해 사용자 세션 유지
- **라우트 가드**: `PublicRoute`, `ProtectedRoute`를 통한 페이지 접근 제어

---

## 🛠 기술 스택

### Core

- **Library**: `React 19`
- **Language**: `TypeScript`
- **Build Tool**: `Vite`

### Ecosystem

- **Routing**: `react-router-dom` (v7)
- **Feedback**: `react-toastify` (사용자 알림 처리)
- **Icons**: `react-icons`
- **Styling**: `CSS` (반응형 `clamp()` 함수 활용)

---

## 📂 프로젝트 구조

관심사 분리를 위해 기능 단위로 폴더를 엄격히 구분하였습니다.

```bash
src/
├── components/     # UI 원자 단위 및 공통 컴포넌트 (AuthField, Button, Card 등)
├── context/        # 전역 상태 관리 (AuthProvider, useAuth)
├── hooks/          # React 생명주기와 결합된 커스텀 훅 (usePosts, usePostLikes)
├── services/       # 비즈니스 로직 및 데이터 처리 (postService)
├── utils/          # 순수 자바스크립트 헬퍼 함수 (authValidation)
├── constants/      # 고정 상수 및 스토리지 키 관리 (messages, storage)
├── mocks/          # API 시뮬레이션 (Auth, Users)
└── pages/          # 라우트 단위 페이지 (Home, Login, Signup, MyPage)
```
