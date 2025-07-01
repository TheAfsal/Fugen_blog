import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setCredentials } from "./store/slices/authSlice";
import { verifyToken } from "./services/api";
import { Home } from "./pages/Home";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditPostPage } from "./pages/EditPostPage";
import { Navbar } from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyToken();
        dispatch(setCredentials({ user: response.user }));
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          navigate('/');
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          navigate('/login');
        }
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
      </Routes>
    </>
  );
}

export default App;
