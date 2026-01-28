import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { LoadingProvider } from "./context/LoadingProvider";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/login/Login";
import Signup from "./pages/Auth/signup/Signup";
import MyPage from "./pages/mypage/MyPage";
import PublicRoute from "./components/Route/PublicRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
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
