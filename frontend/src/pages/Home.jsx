
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { TbCategory } from "react-icons/tb";
import { GiInspiration } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";


import { Link } from "react-router-dom";
import { useState } from 'react';
export default function Home() {

  useEffect(() => {
  if (sessionStorage.getItem("showLoginToast") === "true") {
    toast.success("Logged in successfully!", { autoClose: 3000 });
    sessionStorage.removeItem("showLoginToast");
  }

  if (sessionStorage.getItem("showSignupToast") === "true") {
    toast.success("Signed up successfully!", { autoClose: 3000 });
    sessionStorage.removeItem("showSignupToast");
  }

  if (sessionStorage.getItem("showLogoutToast") === "true") {
    toast.success("Logged out successfully!", { autoClose: 3000 });
    sessionStorage.removeItem("showLogoutToast");
  }
}, []);

  // Inject Chatbase script on page load
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="4TvAaLqlzOyNYkUc2d6pX";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){
          onLoad()
        } else {
          window.addEventListener("load",onLoad)
        }
      })();
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="page-hero section-padding-lg">
        <div className="container-lg text-center">
          <div className="hero-content">
            <h1
              className="cta-1 animate-fade-up"
              style={{ color: "var(--primary-700)" }}
            >
              Welcome to{" "}
              <span className="cta-1-part animate-fade-in" style={{ color: "var(--accent-orange)" }}>Pouranik</span>
            </h1>
            <p
              className="sub-cta-1 animate-fade-up delay-200"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover amazing books, build lasting reading habits, and join a
              passionate community of book lovers.
              <br />
              Your next great read is just a search away.
            </p>
          </div>

          <div className="hero-buttons animate-fade-up delay-400">
            <Link
              to="/explore"
              className="explore-button"
              data-tour="start-exploring-section"
              style={{
                background: `var(--accent-orange)`,
                color: "#fff",
                boxShadow: "none",
                ...(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? { background: "#115e59" } // darker teal for dark mode
                  : {})
              }}
            >
              <IoSearch className="Explore-icon" />
              <span className="Explore">Start Exploring</span>
            </Link>
            <Link
              to="/genres"
              className="genre-button"
              data-tour="browse-genre-section"
            >
              <LiaBookSolid className="Genres-icon" />
              <span className="Genres">Browse Genres</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2
              className="cta-2"
              style={{ color: "var(--primary-700)" }}
            >
              Why Choose Pouranik?
            </h2>
            <p
              className="sub-cta-2"
              style={{ color: "var(--text-secondary)" }}
            >
              We've designed the perfect platform for book discovery and reading
              inspiration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="book-card animate-scale-in" data-tour="why-choose-pouranik-section">
              <div className="smart-search-icon"><IoSearch /></div>
              <h3
                className="h3"
                style={{ color: "var(--primary-700)" }}
              >
                Smart Search
              </h3>
              <p
                style={{ color: "var(--text-secondary)" }}
                className="smart-search-description"
              >
                Search through millions of books using our powerful Google Books
                API integration. Find exactly what you're looking for with
                intelligent filters and recommendations.
              </p>
            </div>
            <div className="book-card animate-scale-in delay-200">
              <div className="category-icon"><TbCategory /></div>
              <h3
                className="h3"
                style={{ color: "var(--primary-700)" }}
              >
                Rich Categories
              </h3>
              <p
                style={{ color: "var(--text-secondary)" }}
                className="category-description"
              >
                Explore books by genres, topics, and themes. Discover new
                territories in literature and expand your reading horizons with
                curated collections.
              </p>
            </div>
            <div className="book-card animate-scale-in delay-400">
              <div className="inspiration-icon"><GiInspiration /></div>
              <h3
                className="h3"
                style={{ color: "var(--primary-700)" }}
              >
                Get Inspired
              </h3>
              <p
                style={{ color: "var(--text-secondary)" }}
                className="inspiration-description"
              >
                Find detailed book information, ratings, and previews to help
                you make the perfect reading choice every single time you
                browse.

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
            <h3
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--primary-800)" }}
            >
              Ready to Start Your Reading Journey?
            </h3>
            <p
              className="sub-cta-3"
              style={{ color: "var(--primary-700)" }}
            >
              Join thousands of readers who have discovered their next favorite
              book through Pouranik. Your perfect book is waiting for you.
            </p>
            <Link
              to="/explore"
              className="button-primary inline-flex items-center gap-3 no-underline px-10 py-5 text-xl"
              data-tour="find-next-books-section"
              style={{
                background: `var(--accent-orange)`,
                color: "#fff",
                ...(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? { background: "#115e59" } // darker teal for dark mode
                  : {})
              }}
            >
              <span className="target-icon"><TbTargetArrow /></span>
              <span>Find Your Next Book</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}