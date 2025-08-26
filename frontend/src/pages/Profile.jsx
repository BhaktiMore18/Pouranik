import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { LogOut, BookOpen, MessageSquare, Compass, Library, Edit, Check, X } from 'lucide-react';

const Profile = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        navigate('/auth');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleNameUpdate = async () => {
    if (displayName.trim() === '') {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      setUser({ ...user, displayName: displayName.trim() });
      toast.success("Name updated successfully!");
      setIsEditingName(false);
    } catch {
      toast.error("Failed to update name.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.dispatchEvent(new Event('authChange'));
      toast.success("Signed out successfully.");
      navigate('/');
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  if (!user) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 to-white'}`}>
        <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg`}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800'}`}>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${displayName || user.email}&background=random&color=fff`}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-white shadow-md"
            />
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 text-gray-800"
                  />
                  <button onClick={handleNameUpdate} className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white">
                    <Check size={18} />
                  </button>
                  <button onClick={() => setIsEditingName(false)} className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{displayName || 'Welcome!'}</h1>
                  <button onClick={() => setIsEditingName(true)} className="p-1 rounded-full hover:bg-white/20">
                    <Edit size={18} />
                  </button>
                </div>
              )}
              <p className="text-sm opacity-80">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium mt-4 md:mt-0"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-400" size={28} />
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm opacity-80">Books in Library</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="text-green-400" size={28} />
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm opacity-80">Reviews Written</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/explore" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium justify-center">
                <Compass size={18} />
                Explore Books
              </Link>
              <Link to="/library" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium justify-center">
                <Library size={18} />
                Go to Library
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-4">About Pouranik</h2>
          <p className="opacity-90 leading-relaxed">
            Pouranik is your personal gateway to the vast universe of literature. Here, you can discover new books, track your reading journey, connect with fellow book lovers in communities, and join vibrant book clubs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
