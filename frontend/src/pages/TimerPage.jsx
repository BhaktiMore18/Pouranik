// src/pages/TimerPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/ReadingTracker/Timer";

export default function TimerPage() {
  const navigate = useNavigate();

  const userId = "64e2d4f5b12a8c1a2f123456"; 
  const bookId = "64e2d4f5b12a8c1a2f654321"; 

  return (
    <div className="px-4 py-6 flex flex-col items-center bg-[var(--primary-50)] min-h-screen">
      <Timer userId={userId} bookId={bookId} />

      {/* Analytics Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/analytics")}
          className="px-7 py-3 text-lg rounded-lg font-semibold transition duration-300"
          style={{
            background: "var(--primary-600)",
            color: "#fff",
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.05)",
          }}
        >
          📊 View Analytics
        </button>
      </div>
    </div>
  );
}
