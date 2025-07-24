/**
 * @page ScrollToTopButton
 */
import React, { useState, useEffect, useCallback } from "react";

/**
 * @function ScrollToTopButton
 * @returns {JSX.Element} A button that scrolls the page to the top when clicked.
 * It appears when the user scrolls down more than 300 pixels.
 */
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    /**
     * 
     * @param {*} func the function to debounce
     * @param {*} delay the delay in milliseconds
     * @returns {Function} A debounced version of the function that will only execute after the specified delay.
     * @description This function creates a debounced version of the provided function.
     */
    const debounce = (func, delay) => {
        let timeout;
        return function executed(...args) {
            const context = this;
            const later = () => {
                clearTimeout(timeout);
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, delay);
        };
    };

    /**
     * @function toggleVisibility
     * @description Toggles the visibility of the scroll-to-top button based on the current scroll position.
     * If the user has scrolled down more than 300 pixels, the button becomes visible.
     * Otherwise, it hides the button.
     */
    const toggleVisibility = useCallback(() => {
        const currentScrollPos =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (currentScrollPos > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    /**
     * @function scrollToTop
     * @description Scrolls the window to the top smoothly when the button is clicked.
     * It uses the `window.scrollTo` method with smooth behavior.
     * It also sets the scroll position of `document.documentElement` and `document.body`
     * to ensure compatibility across different browsers.
     * @returns {void}
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
        toggleVisibility();
        const debounced = debounce(toggleVisibility, 100);

        window.addEventListener("scroll", debounced, { passive: true });
        document.addEventListener("scroll", debounced, { passive: true });

        return () => {
            window.removeEventListener("scroll", debounced);
            document.removeEventListener("scroll", debounced);
        };
    }, [toggleVisibility]);

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

export default ScrollToTopButton;