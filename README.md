# React Study

React와 Vite를 사용해서 기본 구조와 컴포넌트 렌더링 연습을 진행한 프로젝트입니다.

## 프로젝트 개요
- React 18 + Vite 기반 프로젝트
- TypeScript 사용
- 페이지 구조: Home, Login, Signup
- 공통 UI 컴포넌트: Header, InputField, Button
- 반응형 레이아웃 적용

## 1.16 작업 내용
1. **Header 컴포넌트**
   - NavLink를 사용해 현재 페이지 강조
   - 반응형 글씨 크기 및 hover/active 스타일 적용
   - sticky 속성으로 상단 고정

2. **UI 컴포넌트 연습**
   - InputField, Button 컴포넌트 생성
   - props를 활용해 재사용 가능하게 구성
   - LoginForm에서 InputField와 Button 렌더링

3. **페이지 구성**
   - Home, Login, Signup 페이지 생성
   - LoginForm 컴포넌트에서 InputField/버튼 활용
   - App.tsx에서 BrowserRouter와 Routes 설정

## 추후 작업 내용
1. **폼 기능 구현 (Login/Signup)**
   - InputField와 Button을 활용해서 실제 입력 값 상태 관리
   - LoginForm.tsx에서 입력값을 상태(state)로 관리 → App에서 또는 Context/API로 전달
   - 로그인 버튼 클릭 시 콘솔 출력이나, 나중에 백엔드 연동 테스트

2. **상태 관리 및 유효성 검증**
   - 입력 값 검증 (ex: 이메일 형식, 비밀번호 길이)
   - 입력 상태에 따른 버튼 활성화/비활성화
   - 오류 메시지 표시

3. **공통 레이아웃 컴포넌트 강화**
   - Header에 로그인 상태 표시(로그인 시 “환영합니다”, 로그아웃 버튼)
   - Footer 컴포넌트 추가 가능

4. **페이지 스타일링/반응형 강화**
   - Home, Login, Signup 각 페이지 레이아웃 구성
   - Mobile/Tablet/PC 화면 대응

5. **라우팅/네비게이션 개선**
   - 로그인 상태에 따른 접근 제한 (ex로그인 전에는 Signup/Login만 접근 가능)
   - 로그인 후에는 Home 접근 가능

6. **API 연동 준비**
   - 나중에 백엔드 서버와 통신할 수 있도록 axios/Fetch 세팅
   - 로그인/회원가입 POST 요청 테스트

## 설치 및 실행
```bash
git clone https://github.com/psh1124/React-Study.git
cd React-Study
npm install
npm run dev