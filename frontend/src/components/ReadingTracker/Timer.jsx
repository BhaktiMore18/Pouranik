import React, { useState, useEffect } from 'react';

const Timer = ({ userId, bookId }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // always cleanup
  }, [isRunning]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (!isRunning) {
      setSessionStart(new Date().toISOString()); // store ISO timestamp
    }
    setIsRunning((prev) => !prev);
  };

  const handleStop = async () => {
    setIsRunning(false);

    if (seconds > 0 && userId && bookId) {
      try {
        const res = await fetch("http://localhost:5000/api/reading-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
            start_time: sessionStart,
            duration: seconds
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to save session: ${res.statusText}`);
        }

        console.log("✅ Reading session saved!");
      } catch (error) {
        console.error("❌ Error saving reading session:", error);
      }
    }

    setSeconds(0);
    setSessionStart(null);
  };

  return (
    <section
  className="section-padding"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "var(--primary-50)", // ✅ Full-page background
    padding: "2rem",
  }}
>
  <div className="container-md w-full flex justify-center">
    <div
      className="text-center animate-fade-up w-full max-w-xl"
      style={{
        padding: "3rem 2rem",
        borderRadius: "1.5rem",
        backgroundColor: "#ffffff", // ✅ Card background
        border: "1px solid var(--primary-200)",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Heading */}
      <h2
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--primary-800)" }}
      >
        ⏱️ Reading Timer
      </h2>

      {/* Timer Display */}
      <div className="mb-10">
        <p
          className="text-7xl font-mono font-extrabold"
          style={{ color: "var(--primary-900)", letterSpacing: "2px" }}
        >
          {formatTime()}
        </p>
      </div>

      {/* Button Group */}
      <div className="flex justify-center gap-6">
        <button
          onClick={handleStartPause}
          className="px-7 py-3 text-lg rounded-lg font-semibold transition duration-300"
          style={{
            background: "var(--primary-600)",
            color: "#fff",
          }}
        >
          {isRunning ? 'Pause ⏸️' : 'Start ▶️'}
        </button>
        <button
          onClick={handleStop}
          disabled={seconds === 0}
          className={`px-7 py-3 text-lg rounded-lg font-semibold transition duration-300 border ${seconds === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{
            background: "var(--primary-100)",
            color: "var(--primary-800)",
            borderColor: "var(--primary-300)",
          }}
        >
          Stop ⏹️
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default Timer;