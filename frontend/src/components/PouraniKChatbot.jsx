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
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Enhanced book search function using Gemini AI
async function searchBooks(query, isGenre = true) {
  try {
    let prompt;
    
    if (isGenre) {
      // For book recommendations
      prompt = `Give me exactly 5 popular ${query} book recommendations. 
      Format your response as a numbered list like this:
      1. Book Title by Author Name
      2. Book Title by Author Name
      3. Book Title by Author Name
      4. Book Title by Author Name
      5. Book Title by Author Name
      
      Only include well-known, highly-rated books. Do not include any additional text or explanations.`;
    } else {
      // For book summaries
      prompt = `Provide a concise 100-word summary of the book "${query}". 
      Focus on the main plot, key characters, and central themes. 
      Write it in a clear, engaging way that would help someone understand what the book is about.
      Do not include spoilers or the ending. Just give the summary, no additional text.`;
    }

    const response = await callGeminiAPI(prompt);
    
    if (isGenre) {
      // Parse the book recommendations
      const lines = response.split('\n').filter(line => line.trim());
      const books = [];
      
      for (const line of lines) {
        const match = line.match(/^\d+\.\s*(.+?)\s+by\s+(.+?)$/i);
        if (match) {
          books.push({
            title: match[1].trim(),
            author: match[2].trim()
          });
        }
      }
      
      return books.length > 0 ? books : null;
    } else {
      // Return the book summary
      return response.trim();
    }
  } catch (error) {
    console.error("Gemini API search error:", error);
    
    // Fallback to original simulation if API fails
    if (isGenre) {
      return await simulateGenreSearch(query);
    } else {
      return await simulateBookSummary(query);
    }
  }
}

// Fallback simulation functions (kept as backup)
async function simulateGenreSearch(genre) {
  const genreBooks = {
    fantasy: [
      { title: "The Name of the Wind", author: "Patrick Rothfuss" },
      { title: "The Way of Kings", author: "Brandon Sanderson" },
      { title: "The Priory of the Orange Tree", author: "Samantha Shannon" },
      { title: "The Blade Itself", author: "Joe Abercrombie" },
      { title: "The Bear and the Nightingale", author: "Katherine Arden" },
    ],
    romance: [
      { title: "It Ends with Us", author: "Colleen Hoover" },
      { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
      { title: "Beach Read", author: "Emily Henry" },
      { title: "The Kiss Quotient", author: "Helen Hoang" },
      { title: "Red, White & Royal Blue", author: "Casey McQuiston" },
    ],
    mystery: [
      { title: "The Thursday Murder Club", author: "Richard Osman" },
      { title: "Gone Girl", author: "Gillian Flynn" },
      { title: "The Silent Patient", author: "Alex Michaelides" },
      { title: "The Guest List", author: "Lucy Foley" },
      { title: "In the Woods", author: "Tana French" },
    ],
    science: [
      { title: "Sapiens", author: "Yuval Noah Harari" },
      { title: "Educated", author: "Tara Westover" },
      { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot" },
      { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson" },
      { title: "The Gene", author: "Siddhartha Mukherjee" },
    ],
    fiction: [
      { title: "Where the Crawdads Sing", author: "Delia Owens" },
      { title: "The Midnight Library", author: "Matt Haig" },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro" },
      { title: "The Invisible Bridge", author: "Julie Orringer" },
      { title: "Circe", author: "Madeline Miller" },
    ],
  };

  const normalizedGenre = genre.toLowerCase();
  return genreBooks[normalizedGenre] || genreBooks.fiction;
}

async function simulateBookSummary(bookTitle) {
  const bookSummaries = {
    "the alchemist": "A young Spanish shepherd named Santiago travels from Spain to Egypt in search of treasure buried near the Pyramids. Along the way, he meets a gypsy woman, a king, and an alchemist who help him learn about the importance of listening to his heart and following his dreams. The story explores themes of destiny, personal legend, and the interconnectedness of all things. Santiago discovers that the real treasure was not gold, but the wisdom and self-knowledge he gained during his transformative journey across the desert.",
    
    "harry potter": "A young boy named Harry Potter discovers on his 11th birthday that he is a wizard and has been accepted to Hogwarts School of Witchcraft and Wizardry. He learns about his tragic past and his famous defeat of the dark wizard Voldemort as a baby. At Hogwarts, Harry makes close friends and faces various magical challenges while uncovering the truth about his parents' death. The series follows Harry's growth from a neglected orphan to a powerful wizard who must ultimately confront Voldemort in an epic battle between good and evil.",
    
    "1984": "Set in a dystopian future, the novel follows Winston Smith who lives under the oppressive rule of Big Brother in Oceania. The totalitarian government controls every aspect of life through surveillance, propaganda, and thought manipulation. Winston works at the Ministry of Truth, rewriting history to match the Party's current narrative. He begins a forbidden love affair and joins a resistance movement, but is eventually captured, tortured, and brainwashed into complete submission to the Party's ideology and Big Brother's absolute authority.",
    
    "to kill a mockingbird": "Set in 1930s Alabama, the story is narrated by Scout Finch, who recalls her childhood when her father Atticus, a lawyer, defended a black man falsely accused of rape. Through Scout's innocent eyes, the novel explores themes of racial injustice, moral courage, and loss of innocence in the American South. The mysterious character of Boo Radley serves as a parallel story of prejudice and understanding. Atticus becomes a moral hero who stands against the town's racism despite facing social ostracism and threats to his family.",
    
    "the great gatsby": "Set in the summer of 1922, the story follows Nick Carraway who becomes neighbors with the mysterious millionaire Jay Gatsby on Long Island. Gatsby throws extravagant parties hoping to attract his lost love Daisy Buchanan, who is married to the wealthy but brutish Tom Buchanan. The novel explores themes of the American Dream, social class, and moral decay in the Jazz Age. Gatsby's pursuit of Daisy ultimately leads to tragedy, revealing the corruption and emptiness beneath the glittering surface of the Roaring Twenties.",
    
    "love hypothesis": "Olive Smith, a third-year PhD student at Stanford, convinces her best friend that she's dating someone by kissing Adam Carlsen, a young hotshot professor known for being difficult. When Adam agrees to a fake relationship to help Olive and his own research reputation, their arrangement becomes complicated as real feelings develop. Set in academia, the romance explores themes of imposter syndrome, friendship, and finding love in unexpected places while navigating the competitive world of scientific research.",
    
    "the love hypothesis": "Olive Smith, a third-year PhD student at Stanford, convinces her best friend that she's dating someone by kissing Adam Carlsen, a young hotshot professor known for being difficult. When Adam agrees to a fake relationship to help Olive and his own research reputation, their arrangement becomes complicated as real feelings develop. Set in academia, the romance explores themes of imposter syndrome, friendship, and finding love in unexpected places while navigating the competitive world of scientific research.",
    
    "check mate": "Mallory Greenleaf reluctantly returns to competitive chess after her younger sisters need her support. She faces Nolan Sawyer, the reigning world champion who defeated her years ago and ended her chess career. As they're forced to work together and old tensions resurface, their rivalry transforms into something more complicated. This enemies-to-lovers romance explores second chances, family loyalty, and finding strength to pursue dreams again.",
    
    "checkmate": "Mallory Greenleaf reluctantly returns to competitive chess after her younger sisters need her support. She faces Nolan Sawyer, the reigning world champion who defeated her years ago and ended her chess career. As they're forced to work together and old tensions resurface, their rivalry transforms into something more complicated. This enemies-to-lovers romance explores second chances, family loyalty, and finding strength to pursue dreams again.",
    
    "beach read": "January Andrews, a romance writer experiencing writer's block after her father's death, meets her college rival Gus Everett at a beach town. Both struggling with their writing, they make a pact: she'll write a literary fiction novel while he attempts romance. As they swap genres and spend time together, old feelings resurface. This contemporary romance explores grief, healing, and the power of second chances while celebrating the magic of storytelling and writing.",
    
    "it ends with us": "Lily Bloom moves to Boston to start her own business and meets neurosurgeon Ryle Kincaid. Despite his rule against relationships, they fall in love, but Lily discovers concerning patterns in Ryle's behavior that remind her of her parents' abusive relationship. When her first love Atlas reappears, Lily must make difficult choices about love, self-respect, and breaking cycles of abuse. This emotional romance tackles serious themes of domestic violence and personal strength.",
  };

  const normalizedTitle = bookTitle.toLowerCase().replace(/[^\w\s]/g, '').trim();
  
  // Try exact match first
  if (bookSummaries[normalizedTitle]) {
    return bookSummaries[normalizedTitle];
  }
  
  // Try partial matches
  for (const [key, summary] of Object.entries(bookSummaries)) {
    if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
      return summary;
    }
  }
  
  // Try matching by individual words for complex titles
  const titleWords = normalizedTitle.split(' ');
  for (const [key, summary] of Object.entries(bookSummaries)) {
    const keyWords = key.split(' ');
    const matchedWords = titleWords.filter(word => keyWords.includes(word));
    if (matchedWords.length >= Math.min(2, keyWords.length)) {
      return summary;
    }
  }

  return `I couldn't find detailed information about "${bookTitle}" in my current database. This book might be newer, less popular, or I might need more specific information to locate it. Could you provide the author's name or more details about this book?`;
}

const PouraniKChatbot = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm PouraniK Assistant 📚. I'm powered by AI to give you personalized book recommendations and summaries. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastIntent, setLastIntent] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const intents = {
    purpose: ["what is pouranik", "about pouranik", "tell me about", "mission", "goal", "purpose"],
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
      purpose: "A React-based platform to explore, read, and discuss books while joining like-minded communities.",
    },
    routes: {
      "/": {
        page: "Home",
        description: "The homepage introduces Pouranik, highlights features, and shows trending books or recommendations.",
      },
      "/book/:id": {
        page: "Book Detail",
        description: "Displays detailed information about a specific book including title, author, genre, description, ratings, and availability.",
      },
      "/genres": {
        page: "Genres",
        description: "Lists all book genres like Fiction, Romance, Science, Fantasy, etc., with number of books available in each.",
      },
      "/explore": {
        page: "Explore",
        description: "Discover new books, trending titles, and curated recommendations.",
      },
      "/about": {
        page: "About Us",
        description: "Provides background information about Pouranik, its mission, and the community vision.",
      },
      "/library": {
        page: "Library",
        description: "A personalized space where users can save their books, track progress, and manage their reading collection.",
      },
      "/timerpage": {
        page: "Reading Timer",
        description: "A Pomodoro-style timer that helps readers build consistent reading habits and track focus time.",
      },
      "/analytics": {
        page: "Analytics",
        description: "Shows reading statistics such as number of books read, genres explored, and time spent reading.",
      },
      "/signup": {
        page: "Sign Up / Sign In",
        description: "User authentication page to register a new account or log into an existing one.",
      },
      "/book/:id/reviews": {
        page: "Reviews",
        description: "Displays community reviews, ratings, and discussions for a particular book.",
      },
      "/community": {
        page: "Community",
        description: "Central hub for book lovers to join discussions, share recommendations, and connect with other readers.",
      },
      "/club": {
        page: "Book Club",
        description: "Lists various book clubs (Fantasy, Romance, Sci-Fi, Classics) where members read and discuss selected titles.",
      },
    },
    features: [
      {
        name: "AI-Powered Recommendations",
        description: "Get personalized book suggestions powered by advanced AI technology.",
      },
      {
        name: "Personal Library",
        description: "Save your favorite books, organize your digital shelf, and track your reading progress.",
      },
      {
        name: "Community Book Clubs",
        description: "Join specialized book clubs and participate in live discussions with fellow readers.",
      },
      {
        name: "Reading Timer",
        description: "Stay focused with our built-in Pomodoro timer designed specifically for reading sessions.",
      },
      {
        name: "Analytics Dashboard",
        description: "Get detailed insights into your reading habits, progress, and personal growth metrics.",
      },
    ],
    genres: [
      { name: "Fiction", books: "15M+", description: "Imaginative stories, novels, and literary works from acclaimed authors." },
      { name: "Self-Help", books: "2M+", description: "Personal development, productivity, and life improvement guides." },
      { name: "Biography", books: "1.5M+", description: "Inspiring life stories of notable people throughout history." },
      { name: "Technology", books: "500K+", description: "Programming, AI, digital innovation, and tech industry insights." },
      { name: "History", books: "3M+", description: "Historical events, civilizations, and stories from the past." },
      { name: "Mythology", books: "200K+", description: "Ancient legends, folklore, and cultural myths from around the world." },
      { name: "Science", books: "1M+", description: "Scientific research, discoveries, and educational content." },
      { name: "Romance", books: "8M+", description: "Love stories, relationship novels, and romantic adventures." },
      { name: "Mystery", books: "4M+", description: "Detective stories, thrillers, and suspenseful narratives." },
      { name: "Fantasy", books: "6M+", description: "Magical worlds, epic adventures, and imaginative storytelling." },
      { name: "Horror", books: "800K+", description: "Supernatural tales, psychological thrillers, and scary stories." },
      { name: "Adventure", books: "2.5M+", description: "Exciting journeys, explorations, and action-packed narratives." },
    ],
    community: [
      { name: "Classic Literature Society", reading: "Pride and Prejudice", members: 1247 },
      { name: "Fantasy Realm Explorers", reading: "The Name of the Wind", members: 892 },
      { name: "Mystery & Thriller Society", reading: "Gone Girl", members: 654 },
      { name: "Romance Book Haven", reading: "Beach Read", members: 1103 },
      { name: "Sci-Fi Galaxy", reading: "Project Hail Mary", members: 578 },
      { name: "Young Adult Chronicles", reading: "The Seven Husbands of Evelyn Hugo", members: 934 },
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
      if (lower.match(/what about|how about|tell me about|do you know|tell me more about|summary|plot|synopsis/)) 
        return "bookInfo";
      return findIntent(msg) || scoreIntent(msg) || lastIntent;
    })();

    setLastIntent(intent);

    switch (intent) {
      case "recommend": {
        // Extract genre from user message
        const genreMatches = msg.match(/recommend( me)? (.+?) books?|suggest (.+?) books?|(.+?) book recommendations/);
        let genre = "fiction"; // default

        if (genreMatches) {
          genre = genreMatches[2] || genreMatches[3] || genreMatches[4] || "fiction";
          genre = genre.trim().replace(/some |good |best |popular /, "");
        }

        // Use Gemini AI for book recommendations
        const books = await searchBooks(genre, true);

        if (books && books.length > 0) {
          const list = books
            .slice(0, 5)
            .map((b, i) => `${i + 1}. **${b.title}** by ${b.author}`)
            .join("\n");
          return `Here are 5 AI-recommended **${genre}** books based on current trends:\n\n${list}\n\n🤖 Powered by Pouranik  for personalized recommendations!`;
        } else {
          return `I couldn't find specific recommendations for **${genre}** books right now. Could you try a different genre like fantasy, romance, mystery, or science fiction?`;
        }
      }

      case "bookInfo": {
        if (msg.includes("what about") || msg.includes("how about") || msg.includes("tell me about") || 
            msg.includes("tell me more about") || msg.includes("give me summary") || msg.includes("summary") || 
            msg.includes("plot") || msg.includes("synopsis") || msg.includes("do you know")) {
          
          let query = "";
          
          // Better query extraction logic
          if (msg.includes("tell me about")) {
            query = userMessage.replace(/.*tell me about\s+/i, "").trim();
          } else if (msg.includes("what about")) {
            query = userMessage.replace(/.*what about\s+/i, "").trim();
          } else if (msg.includes("how about")) {
            query = userMessage.replace(/.*how about\s+/i, "").trim();
          } else if (msg.includes("give me summary")) {
            query = userMessage.replace(/.*give me summary\s+(of\s+)?/i, "").trim();
          } else if (msg.includes("summary of")) {
            query = userMessage.replace(/.*summary\s+of\s+/i, "").trim();
          } else if (msg.includes("summary")) {
            query = userMessage.replace(/.*summary\s+/i, "").trim();
          } else if (msg.includes("plot of")) {
            query = userMessage.replace(/.*plot\s+of\s+/i, "").trim();
          } else if (msg.includes("synopsis of")) {
            query = userMessage.replace(/.*synopsis\s+of\s+/i, "").trim();
          } else if (msg.includes("do you know")) {
            query = userMessage.replace(/.*do you know\s+(about\s+)?/i, "").trim();
          } else {
            // Fallback: try to extract everything after common trigger words
            query = userMessage.replace(/.*(summary|plot|synopsis)\s*/i, "").trim();
          }
          
          // Clean up the query
          query = query.replace(/['"]/g, "").replace(/\?/g, "").trim();

          if (!query || query.length < 2) {
            return `Please specify which book you'd like to know about. For example: "Tell me about The Alchemist" or "Give me summary of 1984"`;
          }

          // Use Gemini AI for book summary
          const summary = await searchBooks(query, false);

          if (summary && !summary.includes("couldn't find")) {
            return `📖 **${query}** - AI Summary:\n\n${summary}\n\n🤖 Generated using Gemini AI`;
          } else {
            return `I couldn't find information about **${query}**. Could you check the spelling or try providing the author's name as well?`;
          }
        }
        return `Please specify which book you'd like to know about. Try asking like "What about The Alchemist?" or "Give me summary of Harry Potter"`;
      }

      case "genres": {
        const genresList = knowledgeBase.genres
          .slice(0, 6)
          .map((g) => `📖 **${g.name}** (${g.books}): ${g.description}`)
          .join("\n");
        return `We have books in many genres! Here are some popular ones:\n\n${genresList}\n\nType something like "recommend me Fantasy books" and I'll use AI to fetch personalized recommendations!`;
      }

      case "community": {
        const clubsList = knowledgeBase.community
          .slice(0, 3)
          .map((c) => `📚 **${c.name}** (${c.members} members) - Currently reading "${c.reading}"`)
          .join("\n");
        return `Join our vibrant reading communities! Here are some active book clubs:\n\n${clubsList}\n\nVisit the **Community** page to join discussions and connect with fellow readers!`;
      }

      case "library":
        return `Your **Personal Library** is your digital bookshelf! 📚\n\nYou can:\n• Save favorite books for later\n• Track your reading progress\n• Organize your collection\n• See reading history\n• Set reading goals\n\nTo access it, click on the **Library** tab in the navigation menu!`;

      case "purpose":
        return `Pouranik is an AI-powered React-based platform to explore, read, and discuss books while joining like-minded communities. Our mission is to connect book lovers and make reading more social and engaging using advanced AI technology!`;

      case "timer":
        return `Our **Reading Timer** helps you stay focused! ⏰\n\nFeatures:\n• Pomodoro-style sessions (25min focus + 5min break)\n• Customizable time periods\n• Progress tracking\n• Productivity insights\n\nFind it in the **Timer** page to start building consistent reading habits!`;

      case "analytics":
        return `Track your reading journey with **Analytics Dashboard**! 📊\n\nYou can monitor:\n• Books completed this month\n• Reading streaks and patterns\n• Favorite genres discovered\n• Time spent reading\n• Personal growth metrics\n\nAccess your analytics to see your reading insights!`;

      case "search":
        return `Our **Smart Search** is powered by AI technology! 🔍\n\nYou can search by:\n• Book title\n• Author name\n• Genre preferences\n• Keywords and themes\n\nI use Gemini AI to provide intelligent recommendations and detailed summaries!`;

      default: {
        if (!intent) {
          return `I'm your AI-powered reading assistant! I can help you with:\n\n🤖 **AI Book Recommendations** - "Recommend me fantasy books"\n📖 **Smart Book Summaries** - "Tell me about The Alchemist"\n🏷️ **Genre Discovery** - Learn about different categories\n⚙️ **Platform Features** - Our advanced tools\n👥 **Community** - Book clubs and discussions\n\nPowered by Pouranik  for personalized responses. What would you like to explore?`;
        }

        const responses = [
          "I'm here to help you discover amazing books using AI! You can ask me:\n\n• For personalized book recommendations in any genre\n• About detailed summaries of specific books\n• How to use our platform features\n• About joining reading communities\n• For help navigating the site\n\n🤖 All Powered by Pouranik . What interests you most?",
          "As your AI reading companion, I can:\n\n🔍 Generate personalized book recommendations\n📖 Provide detailed book summaries and plots\n🎯 Help you discover new genres\n👥 Guide you to book communities\n📊 Explain our reading tools\n\n🤖 Enhanced by Gemini AI technology. How can I enhance your reading journey?",
          "Welcome to your AI-powered book discovery experience! I can:\n\n✨ Suggest books tailored to your interests\n📚 Summarize any book you're curious about\n🌟 Help you explore different genres\n💬 Connect you with reading communities\n⚙️ Explain platform features\n\n🤖 All responses generated using advanced AI. What would you like to know?"
        ];

        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

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
    setIsSearching(true);

    try {
      const response = await generateResponse(currentMessage);
      
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
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMsg = {
        id: Date.now() + 1,
        type: "bot",
        content: "⚠️ Sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setIsSearching(false);
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
    {
      icon: BookOpen,
      label: "AI Recommendations",
      action: "recommend me popular fiction books",
    },
    {
      icon: Heart,
      label: "Book Summary",
      action: "tell me about The Alchemist",
    },
    { icon: Sparkles, label: "AI Features", action: "what AI features do you have" },
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
            <div className="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-white/30">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">PouraniK AI Assistant</h3>
                    <p className="text-xs opacity-90 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      Powered by Pouranik 
                    </p>
                  </div>
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
                      <p className="text-xs text-text-secondary mb-3 text-center">
                        Try these AI-powered features:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
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

                  {(isTyping || isSearching) && (
                    <div className="flex items-center gap-2 p-2 text-gray-500 text-sm">
                      <span className="animate-pulse">
                        {isSearching
                          ? "🤖 AI is thinking..."
                          : "✍️ PouraniK Assistant is typing..."}
                      </span>
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
                      placeholder="Ask me: 'Recommend fantasy books' or 'Tell me about 1984'..."
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
        aria-label="Open PouraniK AI Assistant"
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
          <div className="subtitle text-xs mt-1">
            AI-powered book recommendations & summaries
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

        /* Tooltip arrow */
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
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", sans-serif;
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
        .ring-primary-200 {
          --tw-ring-color: #99f6e4;
        }
        .ring-teal-200 {
          --tw-ring-color: #99f6e4;
        }
      `}</style>
    </div>
  );
};

export default PouraniKChatbot;