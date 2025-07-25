import React, { useState } from 'react';

const AISummarySection = ({ bookInfo, cardBaseClasses }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock AI Summary Service (inline for demonstration)
  const generateMockSummary = async (bookInfo) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const { title, categories, pageCount } = bookInfo;
    
    // Generate contextual summary
    const generateTLDR = () => {
      if (categories && categories.some(cat => cat.toLowerCase().includes('fiction'))) {
        return `${title} is a compelling work of fiction that weaves together engaging characters and thought-provoking themes, offering readers an immersive literary experience.`;
      } else if (categories && categories.some(cat => cat.toLowerCase().includes('business'))) {
        return `${title} provides strategic insights and practical business wisdom, helping readers navigate complex professional challenges with proven methodologies.`;
      } else if (categories && categories.some(cat => cat.toLowerCase().includes('history'))) {
        return `${title} offers a comprehensive examination of historical events and their lasting impact, providing readers with valuable context for understanding our world today.`;
      }
      return `${title} presents a thorough exploration of its subject matter, combining expert knowledge with accessible writing to deliver valuable insights to readers.`;
    };

    const generateKeyPoints = () => {
      const basePoints = [
        "Presents well-researched information with clear explanations and practical applications",
        "Combines theoretical concepts with real-world examples to enhance understanding",
        "Offers actionable insights that readers can apply to their personal or professional lives"
      ];

      const categoryPoints = [];
      if (categories) {
        if (categories.some(cat => cat.toLowerCase().includes('self'))) {
          categoryPoints.push("Focuses on personal development strategies and self-improvement techniques");
        }
        if (categories.some(cat => cat.toLowerCase().includes('science'))) {
          categoryPoints.push("Explains complex scientific concepts in an accessible and engaging manner");
        }
        if (categories.some(cat => cat.toLowerCase().includes('philosophy'))) {
          categoryPoints.push("Explores deep philosophical questions that challenge conventional thinking");
        }
      }

      return [...basePoints, ...categoryPoints].slice(0, 5);
    };

    const estimateReadingTime = () => {
      if (!pageCount) return "3-5 hours";
      const hours = Math.round((pageCount * 250) / (200 * 60));
      if (hours < 2) return "1-2 hours";
      if (hours < 4) return "2-4 hours";
      if (hours < 8) return "4-8 hours";
      return `${hours} hours`;
    };

    return {
      tldr: generateTLDR(),
      keyPoints: generateKeyPoints(),
      themes: categories ? categories.slice(0, 3) : ["General Knowledge", "Educational"],
      readingTime: estimateReadingTime(),
      difficulty: pageCount > 400 ? "Intermediate" : "Beginner",
      confidence: Math.floor(Math.random() * 20) + 80 // 80-99%
    };
  };

  const handleGenerateSummary = async () => {
    if (!bookInfo) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const generatedSummary = await generateMockSummary(bookInfo);
      setSummary(generatedSummary);
    } catch (err) {
      setError('Failed to generate AI summary. Please try again later.');
      console.error('Summary generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateSummary = () => {
    setSummary(null);
    handleGenerateSummary();
  };

  if (!summary && !loading) {
    return (
      <section className={`${cardBaseClasses} border-l-4 border-blue-500`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-blue-500 text-3xl">🤖</span>
            AI Book Summary
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            AI Powered
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✨</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">
            Get an AI-Generated Summary
          </h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Let our AI analyze this book and provide you with a concise TL;DR summary, 
            key points, and reading insights in seconds.
          </p>
          <button
            onClick={handleGenerateSummary}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-md"
          >
            <span className="mr-2">🤖</span>
            Generate AI Summary
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Usually takes 2-3 seconds to generate
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={`${cardBaseClasses} border-l-4 border-blue-500`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-blue-500 text-3xl">🤖</span>
            AI Book Summary
          </h3>
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            Generating...
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="relative mb-6">
            <div className="text-6xl animate-bounce">🧠</div>
            <div className="absolute -top-2 -right-2 text-2xl animate-spin">⚡</div>
          </div>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">
            AI is analyzing this book...
          </h4>
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              Reading book description and metadata
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              Identifying key themes and concepts
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
              Generating concise summary and insights
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${cardBaseClasses} border-l-4 border-red-500`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-red-500 text-3xl">🤖</span>
            AI Book Summary
          </h3>
          <div className="flex items-center gap-2 text-sm text-red-600">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            Error
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="text-6xl mb-4">😔</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">
            Oops! Something went wrong
          </h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error}
          </p>
          <button
            onClick={handleGenerateSummary}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-md"
          >
            <span className="mr-2">🔄</span>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${cardBaseClasses} border-l-4 border-green-500`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-green-500 text-3xl">🤖</span>
          AI Book Summary
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            {summary.confidence}% Confidence
          </div>
          <button
            onClick={handleRegenerateSummary}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="Regenerate Summary"
          >
            <span className="mr-1">🔄</span>
            Regenerate
          </button>
        </div>
      </div>

      {/* TL;DR Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📝</span>
          <h4 className="text-xl font-bold text-gray-800">TL;DR</h4>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {summary.tldr}
          </p>
        </div>
      </div>

      {/* Key Points Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h4 className="text-xl font-bold text-gray-800">Key Points</h4>
        </div>
        <div className="space-y-3">
          {summary.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">⏱️</div>
          <div className="text-sm text-purple-600 font-medium">Reading Time</div>
          <div className="text-lg font-bold text-purple-800">{summary.readingTime}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm text-orange-600 font-medium">Difficulty</div>
          <div className="text-lg font-bold text-orange-800">{summary.difficulty}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">🏷️</div>
          <div className="text-sm text-green-600 font-medium">Main Themes</div>
          <div className="text-xs text-green-700 font-medium">
            {summary.themes.join(', ')}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p className="text-xs text-yellow-800">
          <strong>AI Disclaimer:</strong> This summary was generated by artificial intelligence based on available book metadata and description. 
          For the most accurate understanding, please read the full book or preview.
        </p>
      </div>
    </section>
  );
};

export default AISummarySection;