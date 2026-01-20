# React-Study

React + TypeScript + Vite 기반으로 구성된 리액트 학습용 프로젝트입니다.  
기본적인 페이지 구성, 컴포넌트 설계, 유효성 검증, 라우팅 구조 등을 연습하고 정리하기 위한 저장소입니다.

---

## 📌 프로젝트 개요

### 기술 스택
- React 18
- TypeScript
- Vite
- React Router
- CSS (모듈/페이지별)

---

## 🔥 주요 기능

### 1. 페이지 구성
- **Home**: 메인 페이지
- **Login**: 로그인 페이지 (폼 유효성 검증 포함)
- **Signup**: 회원가입 페이지 (비밀번호 확인/검증 포함)

### 2. 공통 컴포넌트
- **Header**: 네비게이션, 반응형 스타일 적용  
- **InputField**: 공통 텍스트 입력 컴포넌트  
- **Button**: 공통 버튼 컴포넌트

### 3. 폼 유효성 검증
- 이메일 형식 체크
- 비밀번호 길이 체크
- 비밀번호 확인 일치 여부 체크
- 입력 상태에 따른 버튼 활성/비활성 처리

### 4. 라우팅
- React Router를 사용한 페이지 이동 처리  
  (`/`, `/login`, `/signup`)

---

## 🗂 폴더 구조

```bash
React-Study/
├─ src/
│ ├─ components/
│ │ ├─ Header/
│ │ ├─ InputField/
│ │ ├─ Button/
│ │ └─ AuthLayout/
│ ├─ hooks/
│ │ └─ useAuthValidation.ts
│ ├─ pages/
│ │ ├─ home/
│ │ ├─ login/
│ │ └─ signup/
│ ├─ App.tsx
│ └─ main.tsx
├─ public/
├─ package.json
├─ vite.config.ts
└─ README.md
```

## 🚀 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/psh1124/React-Study.git

# 프로젝트 폴더로 이동
cd React-Study

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

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

## ✨ 스타일 / UX

- 반응형 레이아웃
- 접근성 고려된 폼 레이블 및 에러 표시
- 버튼 활성/비활성 상태에 따른 UI 피드백

---

## 📌 앞으로 할 작업

1. API 연동 (로그인/회원가입)
2. 로그인 상태 유지 및 인증 흐름 구현
3. 서버 상태 관리 (React Query / Redux 등)
4. 모바일/태블릿 레이아웃 최적화

---

## 🎯 참고

현재 리포지토리는 **학습용 프로젝트**입니다.  
폴더 명명, 컴포넌트 설계, 라우팅 구조 등을 스스로 계획하고 구현하면서 React 개발의 기본 패턴을 연습하기에 적합합니다.

---

## 📄 라이선스

MIT License (필요 시 적용)
