"use client"

import { useState, useEffect, useCallback } from "react"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    const currentScrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0

    setIsVisible(currentScrollPos > 300)
  }, [])

  // Debounce function to limit how often toggleVisibility is called
  const debounce = (func, delay) => {
    let timeoutId
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(func, delay)
    }
  }

  const debouncedToggleVisibility = debounce(toggleVisibility, 100)

  /**
   * @function scrollToTop
   * @description Scrolls the window to the top smoothly when the button is clicked.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }

  useEffect(() => {
    toggleVisibility() // initial check

    window.addEventListener("scroll", debouncedToggleVisibility, { passive: true })
    document.addEventListener("scroll", debouncedToggleVisibility, { passive: true })

    return () => {
      window.removeEventListener("scroll", debouncedToggleVisibility)
      document.removeEventListener("scroll", debouncedToggleVisibility)
    }
  }, [debouncedToggleVisibility, toggleVisibility])

  return (
    <button
      className={`back-to-top-btn ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "140px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#0d9488",
        color: "#fff",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: isVisible ? "bounce 2s infinite" : "none",
      }}
    >
      ↑
    </button>
  )
}

export default ScrollToTopButton
