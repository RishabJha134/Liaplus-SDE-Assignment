import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import RegisterPage from "./pages/Register"
import PostDetailPage from "./pages/PostDetailPage";
import DashboardPage from "./pages/admin/DashboardPage";
import CreatePostPage from "./pages/admin/CreatePostPage";
import EditPostPage from "./pages/admin/EditPostPage";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

// Utils
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-6 flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/posts/create"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <CreatePostPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/posts/edit/:id"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <EditPostPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
