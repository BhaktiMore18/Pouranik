import React, { useState, useEffect, useRef} from 'react';
import { Users, BookOpen, Crown, Search, Star, MessageSquareText, Handshake, Compass ,Zap, } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./community.css";

// Import club images
import classicReadsClub from "./../assets/book-club.png";
import fantasyRealmClub from "./../assets/fantasy.png";
import mysterySocietyClub from "./../assets/mystery.png";
import romanceReadersClub from "./../assets/romance.png";
import scifiExplorersClub from "./../assets/science-fic.png";
import yaReadersClub from "./../assets/young-adult.png";

const Community = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const observerRef = useRef(null);

  // Scroll reveal animation effect
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Add CSS for scroll reveal animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
      }
      
      .scroll-reveal.animate-reveal {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scroll-reveal.delay-200 {
        transition-delay: 0.2s;
      }
      
      .scroll-reveal.delay-400 {
        transition-delay: 0.4s;
      }
      
      .scroll-reveal.delay-600 {
        transition-delay: 0.6s;
      }
      
      .scroll-reveal.delay-800 {
        transition-delay: 0.8s;
      }
      
      .scroll-reveal.delay-1000 {
        transition-delay: 1.0s;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Mock book clubs data
  const bookClubs = [
    {
      id: 1,
      name: "Classic Literature Society",
      description: "Dive deep into timeless masterpieces and discuss their enduring relevance in today's world.",
      tags: ["Classic", "Literature", "Discussion"],
      members: 1247,
      image: classicReadsClub,
      rating: 4.8,
      currentBook: "Pride and Prejudice",
      icon: <BookOpen className="feature-icon" />,
    },
    {
      id: 2,
      name: "Fantasy Realm Explorers",
      description: "Journey through magical worlds, epic quests, and discover new fantasy authors together.",
      tags: ["Fantasy", "Adventure", "Magic"],
      members: 892,
      image: fantasyRealmClub,
      rating: 4.9,
      currentBook: "The Name of the Wind",
      icon: <Compass className="feature-icon" />,
    },
    {
      id: 3,
      name: "Mystery & Thriller Society",
      description: "Unravel complex plots, analyze clues, and solve mysteries alongside fellow detective fiction fans.",
      tags: ["Mystery", "Thriller", "Crime"],
      members: 654,
      image: mysterySocietyClub,
      rating: 4.7,
      currentBook: "Gone Girl",
      icon: <Search className="feature-icon" />,
    },
    {
      id: 4,
      name: "Romance Book Haven",
      description: "Celebrate love stories, swoon over memorable characters, and find your next romantic read.",
      tags: ["Romance", "Contemporary", "HEA"],
      members: 1103,
      image: romanceReadersClub,
      rating: 4.6,
      currentBook: "Beach Read",
      icon: <Handshake className="feature-icon" />,
    },
    {
      id: 5,
      name: "Sci-Fi Galaxy",
      description: "Explore futuristic concepts, space adventures, and cutting-edge science fiction narratives.",
      tags: ["Sci-Fi", "Space", "Future"],
      members: 578,
      image: scifiExplorersClub,
      rating: 4.8,
      currentBook: "Project Hail Mary",
      icon: <Zap className="feature-icon" />,
    },
    {
      id: 6,
      name: "Young Adult Chronicles",
      description: "Discover coming-of-age stories, YA fantasy, and contemporary teen fiction that speaks to all ages.",
      tags: ["YA", "Teen", "Coming-of-Age"],
      members: 934,
      image: yaReadersClub,
      rating: 4.5,
      currentBook: "The Seven Husbands of Evelyn Hugo",
      icon: <MessageSquareText className="feature-icon" />,
    }
  ];

  const categories = ["All", "Fantasy", "Romance", "Mystery", "Sci-Fi", "Classic", "YA"];

  const navigate = useNavigate();

  const filteredClubs = bookClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" ||
                            club.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  const handleJoinClub = (clubName) => {
    if (!isLoggedIn) {
      alert("Please log in to join book clubs. Redirecting to login page...");
      navigate("/signup"); // Redirect to login page
      return;
    }
    alert(`Successfully joined ${clubName}!`);
  };

  const handleCreateClub = () => {
    if (!isLoggedIn) {
      alert("Please log in to create a book club. Redirecting to login page...");
      // In a real app, you'd navigate to a create club page
      return;
    }
    alert("Redirecting to create club page...");
  };

  return (
    <div className="community-page">
      {/* Navigation */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">
              Join a Community of
              <span className="hero-title-highlight">Passionate Readers</span>
            </h1>
            <p className="hero-subtitle">
              Discover book clubs that match your interests, connect with fellow readers,
              and embark on literary adventures together.
            </p>
            <div className="hero-buttons">
              {isLoggedIn && (
                <button className="btn btn-primary btn-lg" onClick={handleCreateClub}>
                  <Crown className="icon-mr" />
                  Create Your Club
                </button>
              )}
              {/* Removed "Browse Clubs" as search/categories below serve this purpose */}
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="search-filter-section scroll-reveal">
            <div className="search-bar-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search clubs by name, genre, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn btn-category ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Book Clubs Grid */}
          <section className="club-grid scroll-reveal delay-200">
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club, index) => {
                const delayClass = index < 2 ? '' : index < 4 ? 'delay-200' : 'delay-400';
                
                return (
                  <div key={club.id} className={`club-card scroll-reveal ${delayClass}`}>
                    {/* Club Image */}
                    <div className="club-image-container">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="club-image"
                      />
                      <div className="club-rating">
                        <Star className="star-icon" />
                        <span className="rating-text">{club.rating}</span>
                      </div>
                    </div>

                    {/* Club Content */}
                    <div className="club-content">
                      <div className="club-header">
                        <h3 className="club-title">{club.name}</h3>
                        <p className="club-description">{club.description}</p>
                      </div>

                      {/* Current Book */}
                      <div className="current-book-info">
                        <div className="current-book-header">
                          <BookOpen className="book-icon" />
                          <span className="current-reading-label">Currently Reading</span>
                        </div>
                        <p className="current-book-title">{club.currentBook}</p>
                      </div>

                      {/* Tags */}
                      <div className="club-tags">
                        {club.tags.map((tag, index) => (
                          <span key={index} className="club-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Members and Join Button */}
                      <div className="club-meta-section">
                        <div className="club-members">
                          <Users className="members-icon" />
                          <span className="members-count">
                            {club.members.toLocaleString()} members
                          </span>
                        </div>
                        {isLoggedIn ? (
                          <Link to={`/club`} className="btn btn-primary btn-join" onClick={() => window.scrollTo(0, 0)}>
                            Join Club
                          </Link>
                        ) : (
                          <button onClick={() => handleJoinClub(club.name)} className="btn btn-primary btn-join">
                            Sign Up to Join
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results-message scroll-reveal">
                <BookOpen className="no-results-icon" />
                <h3 className="no-results-title">No clubs found</h3>
                <p className="no-results-text">
                  Try adjusting your search or browse different categories.
                </p>
                {isLoggedIn && (
                  <button className="btn btn-primary" onClick={handleCreateClub}>
                    <Crown className="icon-mr" />
                    Create the First Club
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Call to Action Section */}
          <section className="cta-section scroll-reveal delay-400">
            <div className="cta-card">
              <h2 className="cta-title">
                Start Your Reading Journey Today
              </h2>
              <p className="cta-description">
                Join thousands of readers who have found their perfect book community.
                Share recommendations, participate in discussions, and discover your next favorite book.
              </p>
              {!isLoggedIn && (
                <div className="cta-buttons">
                  <button className="btn btn-primary btn-lg" onClick={() => setIsLoggedIn(true)}>
                    Get Started Free
                  </button>
                  <button className="btn btn-secondary btn-lg">
                    Learn More
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Community;