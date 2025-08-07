import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

// Component for automatic scroll to top on route changes
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// Component for manual scroll to top button
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = useCallback(() => {
        const currentScrollPos =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        setIsVisible(currentScrollPos > 300);
    }, []);

    // Debounce function to limit how often toggleVisibility is called
    const debounce = (func, delay) => {
        let timeoutId;
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };

    const debouncedToggleVisibility = debounce(toggleVisibility, 100);

    /**
     * @function scrollToTop
     * @description Scrolls the window to the top smoothly when the button is clicked.
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if (document.documentElement) {
            document.documentElement.scrollTop = 0;
        }
        if (document.body) {
            document.body.scrollTop = 0;
        }
    };

    useEffect(() => {
        toggleVisibility(); // initial check

        window.addEventListener("scroll", debouncedToggleVisibility, { passive: true });
        document.addEventListener("scroll", debouncedToggleVisibility, { passive: true });

        return () => {
            window.removeEventListener("scroll", debouncedToggleVisibility);
            document.removeEventListener("scroll", debouncedToggleVisibility);
        };
    }, [debouncedToggleVisibility, toggleVisibility]);

    return (
        <div className="fixed bottom-5 right-5 z-[99]">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{ backgroundColor: "#0d9488" }}
                    className="text-white border-none rounded-full w-[50px] h-[50px] text-5xl cursor-pointer flex items-center justify-center shadow-md"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export { ScrollToTop, ScrollToTopButton };
export default ScrollToTopButton;