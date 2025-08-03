import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import Auth from "../pages/Auth";
import BookDetail from "../pages/BookDetail";
import Genres from "../pages/Genres";
import Reviews from "../pages/Reviews";
import About from "../pages/about";
import Community from "../pages/Community";
import ClubPage from "../pages/ClubPage";
import ProtectedRoute from "../components/ProtectedRoute"; // Import ProtectedRoute

const AppRoutes = ({ isDarkMode }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
      <Route path="/explore" element={<Explore isDarkMode={isDarkMode} />} />
      <Route path="/auth" element={<Auth isDarkMode={isDarkMode} />} />
      <Route path="/book/:id" element={<BookDetail isDarkMode={isDarkMode} />} />
      <Route path="/genres" element={<Genres isDarkMode={isDarkMode} />} />
      <Route path="/about" element={<About isDarkMode={isDarkMode} />} />

      {/* Protected Routes */}
      <Route path="/library" element={<ProtectedRoute><Library isDarkMode={isDarkMode} /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><Reviews isDarkMode={isDarkMode} /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community isDarkMode={isDarkMode} /></ProtectedRoute>} />
      <Route path="/club" element={<ProtectedRoute><ClubPage isDarkMode={isDarkMode} /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
