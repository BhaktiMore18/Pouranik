import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setWeeklyData([
        { day: "Mon", minutes: 45 },
        { day: "Tue", minutes: 30 },
        { day: "Wed", minutes: 60 },
        { day: "Thu", minutes: 25 },
        { day: "Fri", minutes: 50 },
        { day: "Sat", minutes: 40 },
        { day: "Sun", minutes: 35 },
      ]);

      setBookData(
        [
          { bookTitle: "Atomic Habits", minutes: 120, sessions: 4 },
          { bookTitle: "Deep Work", minutes: 90, sessions: 3 },
          { bookTitle: "The Alchemist", minutes: 60, sessions: 2 },
          { bookTitle: "Ikigai", minutes: 75, sessions: 3 },
          { bookTitle: "Can't Hurt Me", minutes: 110, sessions: 5 },
          { bookTitle: "Sapiens", minutes: 80, sessions: 3 },
          { bookTitle: "Mindset", minutes: 55, sessions: 2 },
        ].sort((a, b) => b.minutes - a.minutes)
      );

      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <p className="text-center mt-10">📊 Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-6xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            📖 Reading Dashboard
          </h2>
          <button
            onClick={() => navigate("/timerpage")}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Weekly Stats */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Weekly Reading Time
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                barSize={35}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="minutes" position="top" fill="#111" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Book Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Reading Time per Book
          </h3>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookData}
                layout="vertical"
                barSize={25}
                margin={{ top: 20, right: 40, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="bookTitle" width={120} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="minutes"
                  fill="#16a34a"
                  radius={[0, 6, 6, 0]}
                  name="Minutes Read"
                >
                  <LabelList dataKey="minutes" position="right" fill="#111" />
                </Bar>
                <Bar
                  dataKey="sessions"
                  fill="#f97316"
                  radius={[0, 6, 6, 0]}
                  name="Sessions"
                >
                  <LabelList dataKey="sessions" position="right" fill="#111" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
