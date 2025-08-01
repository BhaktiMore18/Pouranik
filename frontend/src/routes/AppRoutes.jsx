// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
import Genres from '../pages/Genres';
import Explore from '../pages/Explore';
import AboutUs from '../pages/about';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn'; // This will handle 
// both SignIn and SignUp

import AuthForm from '../components/AuthForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />         {/* Default route - Home */}
      <Route path="/signin" element={<SignIn />} />   {/* Optional route */}
      <Route path="/signup" element={<SignIn />} />   {/* SignUp handled inside SignIn */}
      <Route path="/home" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/library" element={<Library />} />
       <Route path="/" element={<Home />} />
    
    </Routes>
  );
};

export default AppRoutes;
