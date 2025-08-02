import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
import Genres from '../pages/Genres';
import Explore from '../pages/Explore';
import AboutUs from '../pages/about';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import Reviews from '../pages/Reviews';
import Community from '../pages/Community';
import ClubPage from '../pages/ClubPage';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅ Imported

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignIn />} />
      <Route path="/book/:id/reviews" element={<Reviews />} />

      {/* Protected Routes */}
      <Route 
        path="/library" 
        element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/club" 
        element={
          <ProtectedRoute>
            <ClubPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
