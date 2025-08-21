import React from "react";
import Analytics from "../components/ReadingTracker/Analytics";

export default function AnalyticsPage() {
  const userId = "64e2d4f5b12a8c1a2f123456"; // temporary fixed ID

  return (
    <div className="px-4 py-6 min-h-screen bg-[var(--primary-50)]">
      <h1 className="text-2xl font-bold text-center mb-6">📊 Reading Analytics</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Analytics userId={userId} />
      </div>
    </div>
  );
}
