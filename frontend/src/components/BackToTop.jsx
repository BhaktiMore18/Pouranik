import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
    if (document.body) {
      document.body.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }, 10);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      if (scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    const handleScroll = () => {
      checkScroll();
    };

    checkScroll();
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    
    const pollInterval = setInterval(() => {
      checkScroll();
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.removeEventListener("scroll", handleScroll, { capture: true });
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-4" style={{ zIndex: 99999 }}>
      <button 
        className={`w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-300 ${
          showButton ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        }`}
        onClick={scrollToTop}
        aria-label="Go to top of page"
        style={{ borderRadius: '30px' }}
      >
        <ArrowUp className="text-white" size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default BackToTop;