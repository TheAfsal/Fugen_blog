import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setCredentials } from "./store/slices/authSlice";
import { verifyToken } from "./services/user.api";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditPostPage } from "./pages/EditPostPage";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { BlogListPage } from "./pages/BlogListPage";
import { SingleBlogPost } from "./pages/SingleBlogPost";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CreatePost } from "./components/CreatePost";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyToken();
        dispatch(setCredentials({ user: response.user }));
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register"
        ) {
          navigate("/");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // if (
        //   window.location.pathname !== "/login" &&
        //   window.location.pathname !== "/register"
        // ) {
        //   navigate("/login");
        // }
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow  mt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/post/:id" element={<SingleBlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
