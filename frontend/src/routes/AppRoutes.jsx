// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
import Genres from '../pages/Genres';
import Explore from '../pages/Explore';
import AboutUs from '../pages/about';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn'; // Handles both SignIn and SignUp
import Reviews from '../pages/Reviews';
import Community from '../pages/Community';
import ClubPage from '../pages/ClubPage';
import TimerPage from '../pages/TimerPage';
import AnalyticsPage from '../pages/AnalyticsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<SignIn />} />         {/* Default route */}
      <Route path="/signin" element={<SignIn />} />   {/* Optional route */}
      <Route path="/signup" element={<SignIn />} />   {/* Handled inside SignIn */}

      {/* Main Pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/book/:id/reviews" element={<Reviews />} />
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