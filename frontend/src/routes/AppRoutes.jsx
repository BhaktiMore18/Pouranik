
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
import Profile from "../pages/Profile"; // Import the new Profile page
import ProtectedRoute from "../components/ProtectedRoute";
import BookDetail from '../pages/BookDetail';
import Genres from '../pages/Genres';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import AboutUs from '../pages/about';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import Reviews from '../pages/Reviews';
import Community from '../pages/Community';
import ClubPage from '../pages/ClubPage';
import TimerPage from '../pages/TimerPage';
import AnalyticsPage from '../pages/AnalyticsPage';

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
      <Route path="/club/:id" element={<ProtectedRoute><ClubPage isDarkMode={isDarkMode} /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile isDarkMode={isDarkMode} /></ProtectedRoute>} />

      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path='/library' element={<Library />} />
      <Route path='/timerpage' element={<TimerPage/>} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path='/signup' element={<SignIn />} />
      <Route path='/book/:id/reviews' element={<Reviews />} />
      <Route path='/community' element={<Community />} />
      <Route path='/club' element={<ClubPage />} />
    </Routes>
  );
};

export default AppRoutes;
