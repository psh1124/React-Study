// 1. React & 라이브러리 (핵심 도구들)
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import nprogress from "nprogress";

// 2. Context & Providers (전역 상태 관리)
import { AuthProvider } from "./context/AuthProvider";
import { LoadingProvider } from "./context/LoadingProvider";

// 3. 내부 공통 컴포넌트 (UI 부품)
import Header from "./components/Header/Header";
import PublicRoute from "./components/Route/PublicRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// 4. 페이지 컴포넌트 (화면 단위)
import Home from "./pages/home/Home";
import Login from "./pages/Auth/login/Login";
import Signup from "./pages/Auth/signup/Signup";
import MyPage from "./pages/mypage/MyPage";

// 5. 스타일 및 CSS (디자인)
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "./App.css";

nprogress.configure({ showSpinner: false, speed: 500 });

function NavigationWatcher() {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();

    const timer = setTimeout(() => {
      nprogress.done();
    }, 200);

    return () => {
      clearTimeout(timer);
      nprogress.start();
    };
  }, [location.pathname]);

  return null;
}

function App() {
  const basename = import.meta.env.MODE === "production" ? "/React-Study" : "";
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter basename={basename}>
            <NavigationWatcher />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />

              {/* 로그인 X */}
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              {/* 로그인 O */}
              <Route
                path="mypage"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <ToastContainer
              style={{ top: "calc(var(--header-height) + 30px)" }}
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              draggable
              theme="dark"
              transition={Slide}
            />
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
