import BookDetail from "../pages/BookDetail";
import Genres from "../pages/Genres";
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
import Bookmarks from '../pages/Bookmarks';
import NoBookFound from '../components/NoBookFound';
import NotFoundPage from '../components/Notfound';
import Privacy from "../pages/privacy.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/library" element={<Library />} />
      <Route path="/timerpage" element={<TimerPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/signup" element={<SignIn />} />
      <Route path="/book/:id/reviews" element={<Reviews />} />
      <Route path="/community" element={<Community />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
