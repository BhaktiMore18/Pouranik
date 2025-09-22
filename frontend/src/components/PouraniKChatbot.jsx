import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";

const chatWithOpenAI = async (userMessage, conversationHistory = []) => {
  try {
    const systemPrompt = `You are PouraniK Assistant, an AI-powered chatbot for a book discovery platform called Pouranik. You help users with:

1. Book recommendations based on genres, themes, or preferences
2. Book summaries and analysis
3. Author information and literary discussions
4. Platform navigation and features
5. Community features and book clubs

Platform Information:
- Pouranik is a React-based platform to explore, read, and discuss books
- Features: Personal Library, Reading Timer, Analytics Dashboard, Community Book Clubs
- Available genres: Fiction (15M+ books), Romance (8M+ books), Fantasy (6M+ books), Mystery (4M+ books), Science (1M+ books), etc.
- Routes: / (Home), /genres (Genres), /explore (Explore), /library (Library), /timerpage (Timer), /analytics (Analytics), /community (Community)

Active Book Clubs:
- Classic Literature Society (1,247 members) - Reading "Pride and Prejudice"
- Fantasy Realm Explorers (892 members) - Reading "The Name of the Wind"  
- Romance Book Haven (1,103 members) - Reading "Beach Read"
- Mystery & Thriller Society (654 members) - Reading "Gone Girl"

Be helpful, knowledgeable about books and literature, and guide users through the platform features. Keep responses conversational and engaging.`;

    const openaiApiKey = 'YOUR_OPENAI_API_KEY_HERE'; // Replace with your actual OpenAI API key

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

const PouraniKChatbot = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm PouraniK Assistant. I'm powered by AI to give you personalized book recommendations, summaries, and answer any book-related questions. I can also help you navigate our platform. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (inputRef.current && !isMinimized) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentMessage = message;
    setMessage("");
    setIsTyping(true);

    try {
      const response = await chatWithOpenAI(currentMessage, messages);
      
      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        content: response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        type: "bot",
        content: "I'm having trouble connecting to the AI service right now. This might be due to network issues or server maintenance. Please try again in a moment, or rephrase your question.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const formatMessage = (content) => {
    return content.split("\n").map((line, index) => {
      const parts = line.split(/(\*\*.*?\*\*)/);
      const formatted = parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-primary-700">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={index} className="block">
          {formatted}
          {index < content.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const quickActions = [
    {
      icon: BookOpen,
      label: "Ask about Books",
      action: "What are some good fantasy book recommendations?",
    },
    {
      icon: Heart,
      label: "Book Recommendations",
      action: "I need a mystery novel suggestion for someone who loved Gone Girl",
    },
    { 
      icon: Sparkles, 
      label: "Platform Help", 
      action: "How do I use the reading timer feature?" 
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {isOpen && (
        <div
          className={`mb-4 transition-all duration-300 ease-out ${
            isMinimized ? "w-80 h-16" : "w-96 h-[550px]"
          }`}
        >
          <div
            className={`h-full flex flex-col glass-effect-strong rounded-2xl border-2 overflow-hidden ${
              isDarkMode
                ? "border-primary-400/20 bg-neutral-100/95"
                : "border-primary-200/50 bg-white/95"
            } backdrop-blur-xl shadow-xl`}
          >
            <div className="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-white/30">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">PouraniK AI Assistant</h3>
                    <div className="text-xs opacity-90 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      Powered by OpenAI
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 size={16} className="text-white" /> : <Minimize2 size={16} className="text-white" />}
                  </button>
                  <button
                    onClick={toggleOpen}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div
                  className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                    isDarkMode
                      ? "bg-gradient-to-b from-neutral-50 to-neutral-100"
                      : "bg-gradient-to-b from-primary-50/30 to-secondary-50/30"
                  }`}
                >
                  {messages.length === 1 && (
                    <div className="mb-4">
                      <p className="text-xs text-text-secondary mb-3 text-center">
                        Try these AI-powered features:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => setMessage(action.action)}
                            className="button-secondary text-xs px-3 py-2 flex items-center gap-2 hover:scale-105 transition-all rounded-lg"
                          >
                            <action.icon size={12} />
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.type === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                          msg.type === "user"
                            ? "bg-primary-500 text-white ring-2 ring-primary-200"
                            : "bg-teal-600 text-white ring-2 ring-teal-200"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                      </div>
                      <div
                        className={`max-w-[85%] ${
                          msg.type === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block px-4 py-3 rounded-2xl shadow-sm border transition-all hover:shadow-md ${
                            msg.type === "user"
                              ? "bg-primary-500 text-white rounded-br-md border-primary-400"
                              : isDarkMode
                              ? "bg-neutral-200 text-text-primary border-neutral-300 rounded-bl-md"
                              : "bg-white text-text-primary border-border-color rounded-bl-md"
                          }`}
                        >
                          <div className="text-sm leading-relaxed">
                            {formatMessage(msg.content)}
                          </div>
                        </div>
                        <div
                          className={`text-xs text-text-muted mt-1 ${
                            msg.type === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 p-2 text-gray-500 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span>AI is thinking...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div
                  className={`p-4 border-t ${
                    isDarkMode
                      ? "border-neutral-300 bg-neutral-100/50"
                      : "border-border-color bg-white/50"
                  } backdrop-blur-sm`}
                >
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about books, authors, or platform features..."
                      className={`flex-1 text-base px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 ${
                        isDarkMode
                          ? "bg-neutral-200/50 border-neutral-400 text-text-primary placeholder-text-muted"
                          : "bg-white/50 border-border-color text-text-primary placeholder-text-secondary"
                      } transition-all duration-200`}
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!message.trim() || isTyping}
                      className="button-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="floating-button"
        aria-label="Open PouraniK AI Assistant"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}

        {unreadCount > 0 && !isOpen && (
          <div className="unread-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}

        <div className="tooltip">
          <div className="title flex items-center gap-2 font-semibold">
            <Sparkles size={14} color="#0f766e" />
            Chat with PouraniK AI
          </div>
          <div className="subtitle text-xs mt-1">
            Dynamic AI-powered book assistant
          </div>
        </div>
      </button>

      <style>{`
        .floating-button {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
          margin-bottom: 8px;
          margin-right: 8px;
          background-color: #0f766e;
          border: none;
          cursor: pointer;
        }

        .floating-button:hover {
          transform: scale(1.1);
        }

        .floating-button svg {
          color: #ffffff;
        }

        .unread-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ff7f50;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          animation: pulse 1.5s infinite;
          border: 2px solid white;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .tooltip {
          position: absolute;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          width: 250px;
          padding: 6px 12px;
          background-color: rgba(255, 255, 255, 0);
          border-radius: 6px;
          font-size: 0.75rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }

        .tooltip .title {
          font-weight: 600;
          color: #0f766e !important;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: normal;
        }

        .tooltip .subtitle {
          font-size: 0.65rem;
          color: #259d93ff !important;
          white-space: nowrap;
        }

        .floating-button:hover .tooltip {
          opacity: 1;
        }

        .tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -8px;
          transform: translateY(-50%);
          border-left: 8px solid #ffffff;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .font-inter {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
        }

        .button-secondary {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
        }

        .button-secondary:hover {
          background-color: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        .button-primary {
          background-color: #0f766e;
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button-primary:hover:not(:disabled) {
          background-color: #0d9488;
          transform: translateY(-1px);
        }

        .text-primary-700 { color: #0f766e; }
        .text-text-primary { color: #171717; }
        .text-text-secondary { color: #525252; }
        .text-text-muted { color: #737373; }
        .border-border-color { border-color: #e2e8f0; }
        .border-primary-200 { border-color: #99f6e4; }
        .border-primary-400 { border-color: #2dd4bf; }
        .border-neutral-300 { border-color: #d4d4d4; }
        .border-neutral-400 { border-color: #a3a3a3; }
        .bg-primary-50 { background-color: #f0fdfa; }
        .bg-primary-500 { background-color: #14b8a6; }
        .bg-primary-600 { background-color: #0d9488; }
        .bg-primary-700 { background-color: #0f766e; }
        .bg-secondary-50 { background-color: #f8fafc; }
        .bg-neutral-50 { background-color: #fafafa; }
        .bg-neutral-100 { background-color: #f5f5f5; }
        .bg-neutral-200 { background-color: #e5e5e5; }
        .ring-primary-200 { --tw-ring-color: #99f6e4; }
        .ring-teal-200 { --tw-ring-color: #99f6e4; }
      `}</style>
    </div>
  );
};

export default PouraniKChatbot;