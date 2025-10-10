import React from 'react';
import { Home, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      {/* Navigation Header */}
     

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-12">
            <div className="text-8xl md:text-9xl font-black text-teal-200/60 select-none tracking-wider transition-colors duration-300">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-teal-500 via-teal-600 to-orange-500 rounded-2xl flex items-center justify-center transform rotate-12 animate-bounce shadow-2xl">
                  <BookOpen className="w-14 h-14 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Lost in Library Message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Lost in the Library
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium transition-colors duration-300">
              This page seems to have wandered off to another chapter!
            </p>

            <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              The page you're looking for might have been moved, deleted, or is currently being rewritten.
            </p>
          </div>

          {/* Centered Back to Home Button */}
          <div className="mb-16">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-12 py-5 rounded-2xl flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl mx-auto group"
            >
              <Home className="w-6 h-6 group-hover:animate-pulse" />
              <span className="text-lg font-bold">Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}