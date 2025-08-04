import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { TbCategory } from "react-icons/tb";
import { GiInspiration } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";

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
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-sm">
        <div className="container-md">
          <div className="card-modern text-center" data-tour="powered-by-google-books-section">
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
                  100+
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
                "linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)",
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
