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

async function fetchBooks(query, isGenre = true) {
  const searchQuery = isGenre ? `subject:${query}` : `intitle:${query}`;

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchQuery
    )}&maxResults=5`
  );
  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((book) => {
    let description =
      book.volumeInfo.description || "No description available.";
    // Limit to ~100 words
    const words = description.split(" ");
    if (words.length > 100) {
      description = words.slice(0, 100).join(" ");
      // trim at last full stop if possible
      const lastPeriod = description.lastIndexOf(".");
      if (lastPeriod > 50) {
        description = description.slice(0, lastPeriod + 1);
      } else {
        description += "...";
      }
    }

    return {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
      link: book.volumeInfo.infoLink,
      description,
    };
  });
}

const PouraniKChatbot = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm PouraniK Assistant 📚. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastIntent, setLastIntent] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const intents = {
    purpose: [
      "what is pouranik",
      "about pouranik",
      "tell me about",
      "mission",
      "goal",
      "purpose",
    ],
    features: ["feature", "what can", "capabilities", "tools", "functions"],
    genres: ["genre", "category", "type of book", "book kind"],
    community: ["community", "book club", "discussion", "groups"],
    library: ["library", "my books", "saved", "bookshelf"],
    timer: ["timer", "focus", "reading session", "pomodoro"],
    analytics: ["analytics", "stats", "progress", "tracking"],
    search: ["search", "find book", "look for", "discover"],
    recommend: ["recommend", "suggest", "what should i read", "advise"],
  };

  // Enhanced knowledge base
  const knowledgeBase = {
    website: {
      name: "Pouranik",
      tagline: "Discover Amazing Books",
      purpose:
        "A React-based platform to explore, read, and discuss books while joining like-minded communities.",
    },
    routes: {
      "/": {
        page: "Home",
        description:
          "The homepage introduces Pouranik, highlights features, and shows trending books or recommendations.",
      },
      "/book/:id": {
        page: "Book Detail",
        description:
          "Displays detailed information about a specific book including title, author, genre, description, ratings, and availability.",
      },
      "/genres": {
        page: "Genres",
        description:
          "Lists all book genres like Fiction, Romance, Science, Fantasy, etc., with number of books available in each.",
      },
      "/explore": {
        page: "Explore",
        description:
          "Discover new books, trending titles, and curated recommendations.",
      },
      "/about": {
        page: "About Us",
        description:
          "Provides background information about Pouranik, its mission, and the community vision.",
      },
      "/library": {
        page: "Library",
        description:
          "A personalized space where users can save their books, track progress, and manage their reading collection.",
      },
      "/timerpage": {
        page: "Reading Timer",
        description:
          "A Pomodoro-style timer that helps readers build consistent reading habits and track focus time.",
      },
      "/analytics": {
        page: "Analytics",
        description:
          "Shows reading statistics such as number of books read, genres explored, and time spent reading.",
      },
      "/signup": {
        page: "Sign Up / Sign In",
        description:
          "User authentication page to register a new account or log into an existing one.",
      },
      "/book/:id/reviews": {
        page: "Reviews",
        description:
          "Displays community reviews, ratings, and discussions for a particular book.",
      },
      "/community": {
        page: "Community",
        description:
          "Central hub for book lovers to join discussions, share recommendations, and connect with other readers.",
      },
      "/club": {
        page: "Book Club",
        description:
          "Lists various book clubs (Fantasy, Romance, Sci-Fi, Classics) where members read and discuss selected titles.",
      },
    },
    features: [
      {
        name: "Smart Search",
        description:
          "Search millions of books using Google Books API with intelligent filtering and recommendations.",
      },
      {
        name: "Personal Library",
        description:
          "Save your favorite books, organize your digital shelf, and track your reading progress.",
      },
      {
        name: "Community Book Clubs",
        description:
          "Join specialized book clubs and participate in live discussions with fellow readers.",
      },
      {
        name: "Reading Timer",
        description:
          "Stay focused with our built-in Pomodoro timer designed specifically for reading sessions.",
      },
      {
        name: "Analytics Dashboard",
        description:
          "Get detailed insights into your reading habits, progress, and personal growth metrics.",
      },
    ],
    genres: [
      {
        name: "Fiction",
        books: "15M+",
        description:
          "Imaginative stories, novels, and literary works from acclaimed authors.",
      },
      {
        name: "Self-Help",
        books: "2M+",
        description:
          "Personal development, productivity, and life improvement guides.",
      },
      {
        name: "Biography",
        books: "1.5M+",
        description:
          "Inspiring life stories of notable people throughout history.",
      },
      {
        name: "Technology",
        books: "500K+",
        description:
          "Programming, AI, digital innovation, and tech industry insights.",
      },
      {
        name: "History",
        books: "3M+",
        description:
          "Historical events, civilizations, and stories from the past.",
      },
      {
        name: "Mythology",
        books: "200K+",
        description:
          "Ancient legends, folklore, and cultural myths from around the world.",
      },
      {
        name: "Science",
        books: "1M+",
        description:
          "Scientific research, discoveries, and educational content.",
      },
      {
        name: "Romance",
        books: "8M+",
        description:
          "Love stories, relationship novels, and romantic adventures.",
      },
      {
        name: "Mystery",
        books: "4M+",
        description:
          "Detective stories, thrillers, and suspenseful narratives.",
      },
      {
        name: "Fantasy",
        books: "6M+",
        description:
          "Magical worlds, epic adventures, and imaginative storytelling.",
      },
      {
        name: "Horror",
        books: "800K+",
        description:
          "Supernatural tales, psychological thrillers, and scary stories.",
      },
      {
        name: "Adventure",
        books: "2.5M+",
        description:
          "Exciting journeys, explorations, and action-packed narratives.",
      },
    ],
    community: [
      {
        name: "Classic Literature Society",
        reading: "Pride and Prejudice",
        members: 1247,
      },
      {
        name: "Fantasy Realm Explorers",
        reading: "The Name of the Wind",
        members: 892,
      },
      {
        name: "Mystery & Thriller Society",
        reading: "Gone Girl",
        members: 654,
      },
      { name: "Romance Book Haven", reading: "Beach Read", members: 1103 },
      { name: "Sci-Fi Galaxy", reading: "Project Hail Mary", members: 578 },
      {
        name: "Young Adult Chronicles",
        reading: "The Seven Husbands of Evelyn Hugo",
        members: 934,
      },
    ],
  };

  const findIntent = (msg) => {
    msg = msg.toLowerCase();
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some((k) => msg.includes(k))) {
        return intent;
      }
    }
    return null;
  };

  const scoreIntent = (msg) => {
    msg = msg.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;
    for (const [intent, keywords] of Object.entries(intents)) {
      let score = keywords.filter((k) => msg.includes(k)).length;
      if (score > maxScore) {
        maxScore = score;
        bestMatch = intent;
      }
    }
    return bestMatch;
  };

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

  const generateResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase();
    const intent = (() => {
      const lower = msg.toLowerCase();
      if (lower.match(/what about|how about|tell me about|do you know|tell me more about/))
        return "bookInfo";
      return findIntent(msg) || scoreIntent(msg) || lastIntent;
    })();

    setLastIntent(intent);

    switch (intent) {
      case "recommend": {
        // User wants genre-based suggestion
        const match = msg.match(/recommend( me)? (.+?) books?/);
        const genre = match && match[2] ? match[2].trim() : "fiction";

        const books = await fetchBooks(genre, true); // genre search
        const list = books
          .map((b, i) => `${i + 1}. **${b.title}** by ${b.author}`)
          .join("\n");
        return `Here are some **${genre}** books I recommend:\n\n${list}`;
      }

      case "bookInfo": {
        if (
          msg.includes("what about") ||
          msg.includes("how about") ||
          msg.includes("tell me about") ||
          msg.includes("give me summary") ||
          msg.includes("do you know")
        ) {
          const query = userMessage
            .replace(
              /.*(what about|how about|tell me about|give me summary|do you know)/i,
              ""
            )
            .trim();

          const books = await fetchBooks(query, false);

          if (!books.length) {
            return `Hmm, I couldn’t find anything for **${query}**. Want to try another title?`;
          }

          // Take the first book only
          const book = books[0];

          return `📖 **${book.title}** by ${book.author}\n\n${book.description}`;
        }
        return `Sorry, I couldn’t understand which book you meant. Try phrasing it like "What about The Alchemist?"`;
      }

      case "genres": {
        const genresList = knowledgeBase.genres
          .slice(0, 6)
          .map((g) => `📖 **${g.name}** (${g.books}): ${g.description}`)
          .join("\n");
        return `We have books in many genres! Here are some popular ones:\n\n${genresList}\n\nType something like "recommend me Fantasy books" and I’ll fetch them live!`;
      }

      case "community": {
        const clubsList = knowledgeBase.community
          .slice(0, 3)
          .map(
            (c) =>
              `📚 **${c.name}** (${c.members} members) - Currently reading "${c.reading}"`
          )
          .join("\n");
        return `Join our vibrant reading communities! Here are some active book clubs:\n\n${clubsList}\n\nVisit the **Community** page to join discussions and connect with fellow readers!`;
      }

      case "library":
        return `Your **Personal Library** is your digital bookshelf! 📚\n\nYou can:\n• Save favorite books for later\n• Track your reading progress\n• Organize your collection\n• See reading history\n• Set reading goals\n\nTo access it, click on the **Library** tab in the navigation menu!`;

      case "purpose":
        return `A React-based platform to explore, read, and discuss books while joining like-minded communities.`;

      case "timer":
        return `Our **Reading Timer** helps you stay focused! ⏰\n\nFeatures:\n• Pomodoro-style sessions (25min focus + 5min break)\n• Customizable time periods\n• Progress tracking\n• Productivity insights\n\nFind it in the **Timer** page to start building consistent reading habits!`;

      case "analytics":
        return `Track your reading journey with **Analytics Dashboard**! 📊\n\nYou can monitor:\n• Books completed this month\n• Reading streaks and patterns\n• Favorite genres discovered\n• Time spent reading\n• Personal growth metrics\n\nAccess your analytics to see your reading insights!`;

      case "search":
        return `Our **Smart Search** is powered by Google Books API! 🔍\n\nYou can search by:\n• Book title\n• Author name\n• ISBN\n• Keywords\n• Genre\n\nWith access to 40M+ books, you'll find exactly what you're looking for. Try the search bar at the top of any page!`;

      default: {
        if (!intent) {
          return `Hmm, I couldn't find that. But you can ask me about:\n\n• Our features\n• Genres we support\n• Community book clubs\n• Reading tools like Timer & Analytics\n\nWhat should I tell you about?`;
        }

        const responses = [
          "That's an interesting question! I can help you with:\n\n📚 **Book discovery** - Find your next favorite read\n🏷️ **Genres** - Explore different categories\n⚙️ **Features** - Learn about our tools\n🗺️ **Navigation** - Find your way around\n👥 **Community** - Connect with readers\n\nWhat would you like to know more about?",
          "I'm here to help you make the most of Pouranik! You can ask me about:\n\n• Finding specific books or genres\n• How to use our features\n• Joining reading communities\n• Navigating the platform\n• Getting personalized recommendations\n\nWhat interests you most?",
          "As your reading companion, I can assist with:\n\n🔍 Discovering amazing books\n📖 Understanding our features\n🎯 Finding your perfect genre\n👥 Connecting with book lovers\n📊 Tracking reading progress\n\nHow can I help enhance your reading journey?",
        ];

        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  };

  const handleSubmit = () => {
    if (!message.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate realistic response time
    setTimeout(async () => {
      const response = await generateResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatMessage = (content) => {
    return content.split("\n").map((line, index) => {
      // Handle bold markdown
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
    { icon: BookOpen, label: "Find Books", action: "show me popular genres" },
    {
      icon: Heart,
      label: "Join Community",
      action: "tell me about book clubs",
    },
    { icon: Sparkles, label: "Features", action: "what features do you have" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {/* Enhanced Chat Widget */}
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
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-primary-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-white/30">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      PouraniK Assistant
                    </h3>
                    <p className="text-xs opacity-90 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      Online & Ready to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleOpen}
                    className="p-2 bg-black text-white rounded-xl transition-all duration-200 hover:scale-110"
                    aria-label="Close chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div
                  className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                    isDarkMode
                      ? "bg-gradient-to-b from-neutral-50 to-neutral-100"
                      : "bg-gradient-to-b from-primary-50/30 to-secondary-50/30"
                  }`}
                >
                  {/* Quick Actions (only show initially) */}
                  {messages.length === 1 && (
                    <div className="mb-4">
                      <p className="text-xs text-text-secondary mb-2 text-center">
                        Quick actions:
                      </p>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => setMessage(action.action)}
                            className="button-secondary text-xs px-3 py-2 flex items-center gap-2 hover:scale-105 transition-all"
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
                            : "bg-[#0f766e] text-white ring-2 ring-secondary-200"
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
                          <p className="text-sm leading-relaxed">
                            {formatMessage(msg.content)}
                          </p>
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
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-md">
                        <Bot size={14} />
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border ${
                          isDarkMode
                            ? "bg-neutral-200 border-neutral-300"
                            : "bg-white border-border-color"
                        }`}
                      >
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
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
                      placeholder="Ask me about books, genres, features..."
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

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="floating-button"
        aria-label="Open PouraniK Assistant"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}

        {unreadCount > 0 && !isOpen && (
          <div className="unread-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}

        {/* Tooltip */}
        <div className="tooltip">
          <div className="title flex items-center gap-2 font-semibold">
            <Sparkles size={14} color="#0f766e" />
            Chat with PouraniK AI
          </div>
          <div className="subtitle text-xs mt-1">Get help with books & features</div>
        </div>
      </button>

      <style jsx>{`
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
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        /* Tooltip */
        .tooltip {
          position: absolute;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          width: 250px;
          padding: 6px 12px;
          background-color: rgba(255, 255, 255, 0); /* transparent */
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

        /* Tooltip arrow */
        .tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -8px;
          transform: translateY(-50%);
          border-left: 8px solid #ffffff; /* arrow color */
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .font-inter {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", sans-serif;
        }

        .text-primary-700 {
          color: #0f766e;
        }
        .text-text-primary {
          color: #171717;
        }
        .text-text-secondary {
          color: #525252;
        }
        .text-text-muted {
          color: #737373;
        }
        .border-border-color {
          border-color: #e2e8f0;
        }
        .border-primary-200 {
          border-color: #99f6e4;
        }
        .border-primary-400 {
          border-color: #2dd4bf;
        }
        .border-neutral-300 {
          border-color: #d4d4d4;
        }
        .border-neutral-400 {
          border-color: #a3a3a3;
        }
        .bg-primary-50 {
          background-color: #f0fdfa;
        }
        .bg-primary-500 {
          background-color: #14b8a6;
        }
        .bg-primary-600 {
          background-color: #0d9488;
        }
        .bg-primary-700 {
          background-color: #0f766e;
        }
        .bg-secondary-50 {
          background-color: #f8fafc;
        }
        .bg-secondary-600 {
          background-color: #475569;
        }
        .bg-secondary-700 {
          background-color: #334155;
        }
        .bg-neutral-50 {
          background-color: #fafafa;
        }
        .bg-neutral-100 {
          background-color: #f5f5f5;
        }
        .bg-neutral-200 {
          background-color: #e5e5e5;
        }
        .bg-accent-orange {
          background-color: #f97316;
        }
        .ring-primary-200 {
          --tw-ring-color: #99f6e4;
        }
        .ring-secondary-200 {
          --tw-ring-color: #e2e8f0;
        }
        .shadow-primary-500 {
          --tw-shadow-color: #14b8a6;
        }
        .shadow-primary-600 {
          --tw-shadow-color: #0d9488;
        }
      `}</style>
    </div>
  );
};

export default PouraniKChatbot;
