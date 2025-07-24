import { Link } from "react-router-dom";
import { useState } from 'react';
export default function Home() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const handleClick = (action) => {
    console.log(`${action} clicked`);
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/*  Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-1"></div>


  <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-2"></div>

  <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-3"></div>
</div>

        <div className="container-lg text-center relative z-10">
          {/*content*/}
          <div className="container-lg text-center z-10 px-4">
            <div className="floating-animation">
              <h1 className="text-6xl md:text-7xl font-bold mb-6" style={{ color: 'var(--primary-700)' }}>
                Welcome to <span style={{ color: 'var(--accent-orange)' }}>Pouranik</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-16" style={{ color: 'var(--text-secondary)' }}>
                Discover amazing books, build lasting reading habits, and join a passionate community of book lovers. 
                Your next great read is just a search away.

              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
      {/* Primary Button - Start Exploring */}
      <button
        onClick={() => handleClick('explore')}
        onMouseEnter={() => setHoveredButton('explore')}
        onMouseLeave={() => setHoveredButton(null)}
        className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg min-w-[220px] justify-center
                   bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl
                   transform transition-all duration-300 ease-out
                   hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25
                   active:scale-95 overflow-hidden"
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-300 opacity-0 group-hover:opacity-400 transition-opacity duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        
        {/* Content */}
        <span className={`text-xl relative z-10 transform transition-all duration-300 ${
          hoveredButton === 'explore' ? 'rotate-12 scale-110' : ''
        }`}>
          🚀
        </span>
        <span className="relative z-10 tracking-wide">Start Exploring</span>
        
        {/* Floating particles effect */}
        {hoveredButton === 'explore' && (
          <>
            <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></div>
            <div className="absolute bottom-3 right-12 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
          </>
        )}
      </button>

      {/* Secondary Button - Browse Genres */}
      <button
        onClick={() => handleClick('genres')}
        onMouseEnter={() => setHoveredButton('genres')}
        onMouseLeave={() => setHoveredButton(null)}
        className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg min-w-[220px] justify-center
                   bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200
                   transform transition-all duration-300 ease-out
                   hover:scale-105 hover:shadow-2xl hover:shadow-gray-300/30 hover:border-teal-300
                   active:scale-95 overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-200 opacity-0 group-hover:opacity-400 transition-opacity duration-300"></div>
        
        {/* Border animation */}
        <div className="absolute inset-0 rounded-2xl  opacity-0 group-hover:opacity-400 transition-opacity duration-300"></div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400/10 to-orange-400/10 scale-0 group-hover:scale-400 transition-transform duration-500"></div>
        
        {/* Content */}
        <span className={`text-xl relative z-10 transform transition-all duration-300 ${
          hoveredButton === 'genres' ? 'rotate-6 scale-110' : ''
        }`}>
          📚
        </span>
        <span className="relative z-10 tracking-wide  group-hover:text-teal-900 transition-colors duration-300">
  Browse Genres
</span>
        
        {/* Subtle glow dots */}
        {hoveredButton === 'genres' && (
          <>
            <div className="absolute top-3 left-6 w-2 h-2 bg-teal-400 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-2 right-10 w-1.5 h-1.5 bg-teal-800 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          </>
        )}
      </button>
    </div>
          </div>
        </div>

    
      </section>

   {/* Features Section */}
<section className="page-hero section-spacing-small">
  <div className="container-modern">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--primary-700)" }}>
        Why Choose Pouranik?
      </h2>
      <div className="flex justify-center">
      <p
        className="text-sm md:text-lg max-w-2xl mx-auto"
        style={{ color: "var(--text-secondary)" }}
      >
        We've designed the perfect platform for book discovery and reading inspiration.
      </p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
      {[
        {
          icon: "🔍",
          title: "Smart Search",
          desc: "Search through millions of books using our powerful Google Books API. Find what you need with intelligent filters and recommendations.",
        },
        {
          icon: "📑",
          title: "Rich Categories",
          desc: "Explore books by genres and themes. Discover new territories in literature with curated collections.",
        },
        {
          icon: "💫",
          title: "Get Inspired",
          desc: "Get ratings, summaries, and previews to help make your next favorite pick with confidence.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="card-modern transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md rounded-2xl bg-white aspect-square w-full max-w-[300px] flex flex-col justify-center items-center p-6 text-center group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 " style={{ color: "var(--primary-700)" }}>
            {feature.title}
          </h3>
          <p
            className="text-xs md:text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className=" py-16">
        <div className="container-md">

          <div className="card-modern text-center">
            <h3
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--primary-700)" }}
            >
 Powered by Google Books
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: "var(--accent-orange)" }}
                >
                  40M+
                </div>
                <div
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Books Available
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: "var(--accent-orange)" }}
                >
                  400+
                </div>
                <div
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Languages
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: "var(--accent-orange)" }}
                >
                  ∞
                </div>
                <div
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Possibilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-md">
          <div
            className="card-modern text-center"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-50) 0%, var(--primary-400) 400%)",
              border: "1px solid var(--primary-200)",
            }}
          >
            <div className="text-6xl mb-8">🌟</div>
            <h3
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--primary-800)" }}
            >
              Ready to Start Your Reading Journey?
            </h3>
            <p
              className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--primary-700)" }}
            >
              Join thousands of readers who have discovered their next favorite
              book through Pouranik. Your perfect book is waiting for you.
            </p>
            <Link
              to="/explore"
              className="button-primary inline-flex items-center gap-3 no-underline px-10 py-5 text-xl"
              data-tour="find-next-books-section"
            >
              <span className="text-2xl">🎯</span>
              <span>Find Your Next Book</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}