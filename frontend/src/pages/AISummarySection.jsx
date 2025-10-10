import { useState } from 'react';
import { generateBookSummary } from '../services/AISummaryService'; 

export default function AISummarySection({ bookInfo, cardBaseClasses }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleGenerateSummary = async () => {
    if (!bookInfo.title) {
      setError('Book title is required for AI analysis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateBookSummary({
        title: bookInfo.title,
        authors: bookInfo.authors || [],
        description: bookInfo.description,
        categories: bookInfo.categories || [],
        pageCount: bookInfo.pageCount,
        publishedDate: bookInfo.publishedDate,
        averageRating: bookInfo.averageRating
      });

      setSummary(result);
    } catch (err) {
      console.error('AI Summary Error:', err);
      setError(err.message || 'Failed to generate AI summary');
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation?.toLowerCase()) {
      case 'highly recommended':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'recommended':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'worth considering':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'not recommended':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation?.toLowerCase()) {
      case 'highly recommended':
        return '🌟';
      case 'recommended':
        return '👍';
      case 'worth considering':
        return '🤔';
      case 'not recommended':
        return '👎';
      default:
        return '📖';
    }
  };

  return (
    <section className={`${cardBaseClasses} border-l-4 border-purple-500`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-purple-500 text-3xl">🤖</span>
          AI Book Analysis
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
          Powered by AI
        </div>
      </div>

      {!summary && !loading && (
  <div className="flex flex-col items-center py-10 gap-3">
    <div className="text-6xl">🎯</div>
    <h4 className="text-xl font-semibold text-gray-800">
      Get AI-Powered Book Insights
    </h4>
    <p className="text-gray-600 max-w-lg mx-auto leading-relaxed text-justify mb-8">
      Our AI will analyze this book's content, themes, and provide you with 
      a comprehensive summary and honest recommendation about whether it's worth reading.
    </p>
    <button
      onClick={handleGenerateSummary}
      disabled={loading}
      className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <span className="mr-3">✨</span>
      Generate AI Summary
    </button>
  </div>
)}


      {loading && (
        <div className="text-center py-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
            </div>
          </div>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">
            AI is analyzing this book...
          </h4>
          <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
            Processing themes, content quality, and generating recommendations
          </p>
          <div className="mt-6 max-w-sm mx-auto">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h4 className="text-xl font-semibold text-red-800 mb-3">
            Analysis Failed
          </h4>
          <p className="text-red-700 text-sm mb-6 max-w-md mx-auto">{error}</p>
          <button
            onClick={handleGenerateSummary}
            className="inline-flex items-center px-6 py-3 border border-red-300 text-sm font-medium rounded-md text-red-800 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <span className="mr-2">🔄</span>
            Try Again
          </button>
        </div>
      )}

      {summary && (
        <div className="space-y-8">
          {/* Recommendation Badge */}
          {summary.recommendation && (
            <div className="flex justify-center mb-6">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-base font-bold border-2 ${getRecommendationColor(summary.recommendation)}`}>
                <span className="mr-3 text-xl">
                  {getRecommendationIcon(summary.recommendation)}
                </span>
                {summary.recommendation}
              </div>
            </div>
          )}

          {/* Key Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100 shadow-sm">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-2xl">📝</span>
              AI Summary
            </h4>
            <p className="text-gray-800 leading-relaxed text-base font-medium">
              {summary.summary}
            </p>
          </div>

          {/* Key Themes */}
          {summary.keyThemes && summary.keyThemes.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <span className="text-2xl">🎭</span>
                Key Themes & Topics
              </h4>
              <div className="flex flex-wrap gap-3">
                {summary.keyThemes.map((theme, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full text-sm font-semibold border border-indigo-200"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8">
            {summary.pros && summary.pros.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow-sm">
                <h4 className="text-xl font-bold text-green-800 mb-5 flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  What's Great
                </h4>
                <ul className="space-y-3">
                  {summary.pros.map((pro, index) => (
                    <li key={index} className="text-green-800 text-sm font-medium flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-base font-bold">•</span>
                      <span className="leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary.cons && summary.cons.length > 0 && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200 shadow-sm">
                <h4 className="text-xl font-bold text-red-800 mb-5 flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  Potential Drawbacks
                </h4>
                <ul className="space-y-3">
                  {summary.cons.map((con, index) => (
                    <li key={index} className="text-red-800 text-sm font-medium flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-base font-bold">•</span>
                      <span className="leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Target Audience */}
          {summary.targetAudience && (
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 shadow-sm">
              <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">👥</span>
                Perfect For
              </h4>
              <p className="text-blue-800 text-base font-medium leading-relaxed">
                {summary.targetAudience}
              </p>
            </div>
          )}

          {/* AI Analysis Details (Collapsible) */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 p-3 rounded-lg hover:bg-gray-50"
            >
              <span className="text-base font-semibold flex items-center gap-3">
                <span className="text-xl">🔍</span>
                Analysis Details & Methodology
              </span>
              <span className={`transform transition-transform duration-200 text-lg font-bold ${expanded ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>

            {expanded && (
              <div className="mt-4 text-sm text-gray-700 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">Analysis Method:</strong> This summary was generated using OpenAI's advanced language model 
                    that analyzed the book's title, description, metadata, categories, and available information.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">Confidence Level:</strong> {summary.confidence || 'Medium'} - Based on available book information and analysis depth.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">Data Sources:</strong> Google Books API, book metadata, genre classifications, and publication details.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">Last Updated:</strong> {new Date().toLocaleDateString()} - 
                    AI analysis reflects current understanding and may vary with different queries.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Regenerate Button */}
          <div className="text-center pt-6 border-t border-gray-100">
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-purple-300 text-base font-semibold rounded-lg text-purple-800 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 shadow-sm"
            >
              <span className="mr-3 text-lg">🔄</span>
              Regenerate Analysis
            </button>
          </div>
        </div>
      )}
    </section>
  );
}