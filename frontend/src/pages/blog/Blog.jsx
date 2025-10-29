import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Calendar,
  User,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Sun,
  Moon,
  Plus,
  Save,
  Eye,
  Filter,
  MessageCircle,
  Send,
  ArrowLeft,
  Tag,
} from 'lucide-react';
// ------------------------------
// Mock data for blogs
// ------------------------------
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    description:
      "Learn how to use React Hooks effectively in your applications. This comprehensive guide covers useState, useEffect, and custom hooks.",
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. They allow us to use state and other React features without writing class components.

## useState Hook

The useState hook lets you add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects:

\`\`\`javascript
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);
\`\`\`

> "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class." - React Documentation

This is just the beginning of what you can do with React Hooks!`,
    author: "John Doe",
    date: "2024-09-20",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    tags: ["React", "JavaScript", "Frontend"],
    category: "Development",
    published: true,
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    description:
      "Deep dive into Tailwind CSS utility classes and how to build beautiful, responsive designs quickly and efficiently.",
    content: `# Mastering Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.

## Why Tailwind?

- **Utility-first**: Build complex components from a constrained set of primitive utilities
- **Responsive**: Every utility class can be applied conditionally at different breakpoints
- **Component-friendly**: Easily extract component classes with \`@apply\`

## Example Usage

\`\`\`html
<div class="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
  <h2 class="text-xl font-semibold text-gray-900">Card Title</h2>
  <p class="text-gray-600 mt-2">Card description goes here.</p>
</div>
\`\`\`

> "The best way to learn Tailwind is to build something with it." - Adam Wathan

Start building amazing UIs today!`,
    author: "Jane Smith",
    date: "2024-09-15",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
    tags: ["CSS", "Tailwind", "Design"],
    category: "Design",
    published: true,
  },
  {
    id: 3,
    title: "JavaScript ES6 Features",
    description:
      "Explore the most important ES6 features that every JavaScript developer should know, including arrow functions and destructuring.",
    content: `# JavaScript ES6 Features

ES6 (ECMAScript 2015) introduced many powerful features that make JavaScript more expressive and easier to work with.

## Arrow Functions

Arrow functions provide a more concise way to write functions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

## Destructuring

Extract values from arrays and objects:

\`\`\`javascript
const person = { name: 'John', age: 30 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second] = numbers;
\`\`\`

These features make JavaScript code more readable and maintainable!`,
    author: "Mike Johnson",
    date: "2024-09-10",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
    tags: ["JavaScript", "ES6", "Programming"],
    category: "Development",
    published: true,
  },
  {
    id: 4,
    title: "AI in Healthcare: Transforming Medicine",
    description:
      "From faster diagnoses to personalized treatments, discover how artificial intelligence is reshaping the healthcare industry while raising important ethical questions.",
    content: `# AI in Healthcare

Artificial Intelligence is no longer science fiction in medicine. Hospitals and research labs use AI to assist doctors, improve accuracy, and save lives.

## Real-World Applications
- **Medical Imaging**: Detect tumors and fractures faster than the human eye.
- **Predictive Analytics**: Forecast patient outcomes and prevent complications.
- **Drug Discovery**: Shorten years of research into months.

## Ethical Challenges
- Data privacy and security.
- Reducing bias in AI models.
- Striking the balance between automation and human judgment.

> "AI won’t replace doctors. But doctors who use AI will replace those who don’t."`,
    author: "Sarah Lee",
    date: "2024-09-05",
    image:
      "https://images.unsplash.com/photo-1581090700227-4c4f50c2b1d6?w=800&h=400&fit=crop",
    tags: ["AI", "Healthcare", "Innovation"],
    category: "Technology",
    published: true,
  },
  {
    id: 5,
    title: "Cybersecurity in 2024: Staying Ahead of Hackers",
    description:
      "Phishing, ransomware, and zero-day exploits are on the rise. Learn the latest security strategies to protect yourself and your organization.",
    content: `# Cybersecurity in 2024

Cyberattacks are growing more sophisticated every year. Being proactive is the only defense.

## Must-Have Practices
- **Zero Trust**: Trust nothing, verify everything.
- **MFA Everywhere**: Even for your personal accounts.
- **AI-Powered Threat Detection**: Spot attacks before they spread.

## Quick Example
\`\`\`bash
# Enable and configure firewall
sudo ufw enable
sudo ufw allow 22/tcp
\`\`\`

Security is not a one-time setup — it’s a daily habit.`,
    author: "David Kim",
    date: "2024-08-25",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
    tags: ["Cybersecurity", "Zero Trust", "Privacy"],
    category: "Security",
    published: true,
  },
  {
    id: 6,
    title: "Beginner’s Guide to AWS Cloud",
    description:
      "Understand EC2, S3, and Lambda with simple explanations and a hands-on example to kickstart your cloud journey.",
    content: `# AWS Cloud Basics

Amazon Web Services powers everything from startups to Fortune 500 companies.

## Core Services
- **EC2**: Virtual machines on demand.
- **S3**: Store and retrieve unlimited files.
- **Lambda**: Run code without managing servers.

## Hands-On Example
\`\`\`bash
# Upload file to S3 bucket
aws s3 cp report.pdf s3://company-reports/
\`\`\`

Learning cloud is like learning electricity — once you get it, you’ll wonder how you worked without it.`,
    author: "Anita Rao",
    date: "2024-08-18",
    image:
      "https://images.unsplash.com/photo-1581091012184-5c11b9e3a13c?w=800&h=400&fit=crop",
    tags: ["AWS", "Cloud", "Infrastructure"],
    category: "Cloud",
    published: true,
  },
  {
    id: 7,
    title: "Data Science with Python: From CSV to Insights",
    description:
      "Pandas, NumPy, and Matplotlib are your keys to turning raw data into visual stories. Learn how to start analyzing today.",
    content: `# Data Science with Python

Python’s ecosystem makes it the top choice for data analysis.

## Key Libraries
- **NumPy**: Math with arrays at lightning speed.
- **Pandas**: Clean, transform, and organize data.
- **Matplotlib**: Turn numbers into visual insights.

## Quick Demo
\`\`\`python
import pandas as pd

df = pd.read_csv('sales.csv')
print(df.groupby('region')['revenue'].sum())
\`\`\`

Data without analysis is just noise. Python helps you find the story inside the numbers.`,
    author: "Ravi Kumar",
    date: "2024-08-10",
    image:
      "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=800&h=400&fit=crop",
    tags: ["Python", "Data Science", "Analytics"],
    category: "Data Science",
    published: true,
  },
  {
    id: 8,
    title: "Productivity Hacks with Notion",
    description:
      "Stop juggling sticky notes and apps. Use Notion to manage tasks, notes, and projects in one place.",
    content: `# Productivity with Notion

Notion is more than just a note-taking app — it’s a workspace for everything.

## Why Notion Works
- **Customizable Databases**: Build your own CRM or task tracker.
- **Markdown Editing**: Simple but powerful.
- **Integrations**: Connect with Google Drive, Slack, and more.

## Daily Example
\`\`\`markdown
# Today’s Tasks
- [ ] Finish blog draft
- [ ] Deploy new build
- [ ] Call with client
\`\`\`

Notion is like digital Lego — build whatever productivity system works for you.`,
    author: "Emily Clark",
    date: "2024-08-02",
    image:
      "https://images.unsplash.com/photo-1523475496153-3d6cc0c76b14?w=800&h=400&fit=crop",
    tags: ["Productivity", "Tools", "Notion"],
    category: "Lifestyle",
    published: true,
  },
  {
    id: 9,
    title: "DevOps Demystified: Docker & Kubernetes",
    description:
      "Learn why Docker and Kubernetes are the backbone of modern software deployment and how they work together to scale apps seamlessly.",
    content: `# Docker & Kubernetes

Every modern developer needs to understand containerization and orchestration.

## Docker: Packaging Apps
\`\`\`dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
\`\`\`

## Kubernetes: Running at Scale
- Self-healing pods.
- Rolling deployments.
- Seamless scaling.

Docker builds the box. Kubernetes manages millions of them. Together, they define DevOps in 2024.`,
    author: "Carlos Mendes",
    date: "2024-07-28",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab72e37f8e?w=800&h=400&fit=crop",
    tags: ["Docker", "Kubernetes", "DevOps"],
    category: "DevOps",
    published: true,
  },
  {
    id: 10,
    title: "The Rise of Blockchain Beyond Crypto",
    description:
      "Discover how blockchain is powering supply chains, healthcare, and government systems outside of cryptocurrencies.",
    content: `# Blockchain Beyond Crypto

While Bitcoin popularized blockchain, its real-world use cases go far beyond digital currency.

## Applications
- **Supply Chain**: Transparent tracking of goods.
- **Healthcare**: Secure patient records.
- **Voting Systems**: Tamper-proof elections.

## Example
Hyperledger, Ethereum, and private blockchains are leading the way.`,
    author: "Laura Chen",
    date: "2024-07-15",
    image:
      "https://images.unsplash.com/photo-1518544889280-cf3e28c8b7e7?w=800&h=400&fit=crop",
    tags: ["Blockchain", "Technology", "Innovation"],
    category: "Technology",
    published: true,
  },
  {
    id: 11,
    title: "Green Tech: Sustainability Through Innovation",
    description:
      "Learn how clean energy, smart grids, and eco-friendly innovations are shaping a sustainable future.",
    content: `# Green Technology

Technology can drive sustainability when applied with purpose.

## Innovations
- **Solar & Wind Power**
- **Smart Grids**
- **Electric Vehicles**

## Why It Matters
Reducing carbon footprint is no longer optional.`,
    author: "Arun Nair",
    date: "2024-07-05",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=400&fit=crop",
    tags: ["Sustainability", "Green Tech", "Environment"],
    category: "Sustainability",
    published: true,
  },
  {
    id: 12,
    title: "The Psychology of User Experience (UX)",
    description:
      "Understand how human behavior and psychology influence great UX design.",
    content: `# UX Psychology

Design is not just about pixels, it's about people.

## Principles
- **Cognitive Load**: Keep interfaces simple.
- **Hick’s Law**: Fewer choices = faster decisions.
- **Emotional Design**: Delight your users.

Good UX is invisible.`,
    author: "Nina Patel",
    date: "2024-06-28",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    tags: ["UX", "Design", "Psychology"],
    category: "Design",
    published: true,
  },
  {
    id: 13,
    title: "Quantum Computing: The Next Frontier",
    description:
      "Explore how quantum mechanics is redefining the limits of computation.",
    content: `# Quantum Computing

Quantum computers process information in qubits, unlocking massive parallelism.

## Key Concepts
- **Superposition**
- **Entanglement**
- **Quantum Supremacy**

It’s still early days, but the future is quantum.`,
    author: "Robert Hayes",
    date: "2024-06-20",
    image:
      "https://images.unsplash.com/photo-1627742113604-8af2fa2a3439?w=800&h=400&fit=crop",
    tags: ["Quantum", "Computing", "Research"],
    category: "Science",
    published: true,
  },
  {
    id: 14,
    title: "Remote Work: Productivity in the Digital Era",
    description:
      "Learn strategies to stay productive and collaborative in a remote-first world.",
    content: `# Remote Work

The workplace has changed forever.

## Tips
- **Dedicated Workspace**
- **Async Communication**
- **Healthy Work-Life Boundaries**

Remote is not just where you work, it’s how you work.`,
    author: "Sophia Martinez",
    date: "2024-06-10",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    tags: ["Remote Work", "Productivity", "Collaboration"],
    category: "Lifestyle",
    published: true,
  },
  {
    id: 15,
    title: "Cyber Ethics: Navigating the Digital World",
    description: "Explore ethical dilemmas in AI, privacy, and social media.",
    content: `# Cyber Ethics

Technology is powerful, but with power comes responsibility.

## Concerns
- **Data Privacy**
- **AI Bias**
- **Misinformation**

Ethical tech is not optional; it’s essential.`,
    author: "Daniel Brooks",
    date: "2024-05-30",
    image:
      "https://images.unsplash.com/photo-1581093588401-22d04ec4a863?w=800&h=400&fit=crop",
    tags: ["Ethics", "AI", "Privacy"],
    category: "Ethics",
    published: true,
  },
  {
    id: 16,
    title: "The Art of Minimalist Coding",
    description: "Why writing less code often leads to better software.",
    content: `# Minimalist Coding

Good developers solve problems with fewer lines of code.

## Benefits
- Easier maintenance
- Fewer bugs
- Better readability

> “Simplicity is the soul of efficiency.” – Austin Freeman`,
    author: "Kevin Brown",
    date: "2024-05-20",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    tags: ["Coding", "Minimalism", "Best Practices"],
    category: "Development",
    published: true,
  },
  {
    id: 17,
    title: "The Future of Augmented Reality",
    description:
      "Discover how AR is changing gaming, education, and daily life.",
    content: `# Augmented Reality

AR blends the digital with the physical.

## Use Cases
- **Gaming**: Immersive play.
- **Education**: Interactive learning.
- **Retail**: Virtual try-ons.

The world is your canvas with AR.`,
    author: "Emily Zhang",
    date: "2024-05-10",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop",
    tags: ["AR", "Innovation", "Future"],
    category: "Technology",
    published: true,
  },
  {
    id: 18,
    title: "Healthy Living for Developers",
    description:
      "Tips to maintain physical and mental well-being while coding for long hours.",
    content: `# Healthy Living

Developers often neglect health in pursuit of deadlines.

## Tips
- Take breaks
- Maintain posture
- Eat balanced meals
- Prioritize sleep

Healthy body, healthy code.`,
    author: "Maya Thompson",
    date: "2024-04-30",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop",
    tags: ["Health", "Lifestyle", "Developers"],
    category: "Health",
    published: true,
  },
  {
    id: 19,
    title: "Space Exploration in the 21st Century",
    description:
      "A look at Mars missions, private space travel, and the future of humanity among the stars.",
    content: `# Space Exploration

From Mars rovers to SpaceX, the new space race is here.

## Highlights
- **Mars Missions**
- **Commercial Spaceflight**
- **Colonization Potential**

Humanity’s next giant leap starts now.`,
    author: "Dr. Alan White",
    date: "2024-04-20",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=400&fit=crop",
    tags: ["Space", "NASA", "Exploration"],
    category: "Science",
    published: true,
  },
  {
    id: 20,
    title: "Financial Literacy for Young Professionals",
    description:
      "Learn to manage money, investments, and savings in the digital age.",
    content: `# Financial Literacy

Understanding money is as important as earning it.

## Basics
- **Budgeting**
- **Investing Early**
- **Avoiding Debt**

Build wealth, don’t just earn income.`,
    author: "Rachel Green",
    date: "2024-04-10",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437d9?w=800&h=400&fit=crop",
    tags: ["Finance", "Money", "Investments"],
    category: "Finance",
    published: true,
  },
];

// ------------------------------
// Blog System Component
// ------------------------------
const BlogSystem = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [currentView, setCurrentView] = useState("list"); // list, single, create, edit
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated] = useState(true); // Mock auth

  const blogsPerPage = 6;

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory && blog.published;
    });
  }, [blogs, searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage) || 1;
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Get unique categories
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  // Navigation functions
  const navigateToSingle = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("single");
  };

  const navigateToCreate = () => {
    setCurrentView("create");
  };

  const navigateToEdit = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("edit");
  };

  const navigateToList = () => {
    setCurrentView("list");
    setSelectedBlog(null);
  };

  // Blog operations
  const deleteBlog = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      navigateToList();
    }
  };

  const saveBlog = (blogData, isEdit = false) => {
    if (isEdit && selectedBlog) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === selectedBlog.id ? { ...b, ...blogData } : b))
      );
    } else {
      const newBlog = {
        ...blogData,
        id: Date.now(),
        author: "Current User",
        date: new Date().toISOString().split("T")[0],
      };
      setBlogs((prev) => [newBlog, ...prev]);
    }
    navigateToList();
  };

  // Comment functions
  const addComment = (blogId) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: "Current User",
        date: new Date().toISOString().split("T")[0],
      };
      setComments((prev) => ({
        ...prev,
        [blogId]: [...(prev[blogId] || []), comment],
      }));
      setNewComment("");
    }
  };

  // Share functions
  const shareToTwitter = (blog) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      blog.title
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch {
      // fallback
      const tmp = document.createElement("input");
      tmp.value = window.location.href;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      alert("Link copied to clipboard!");
    }
  };

  // Get next/previous blog
  const getNavigationBlogs = (currentBlog) => {
    const publishedBlogs = blogs.filter((b) => b.published);
    const currentIndex = publishedBlogs.findIndex(
      (b) => b.id === currentBlog.id
    );
    return {
      previous: currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null,
      next:
        currentIndex < publishedBlogs.length - 1
          ? publishedBlogs[currentIndex + 1]
          : null,
    };
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-white min-h-screen"
    : "bg-gray-50 text-gray-900 min-h-screen";

  return (
    <div className={themeClasses}>
      {/* Header */}
      <header
        role="banner"
        className={`sticky top-0 z-50 border-b backdrop-blur-md shadow-sm ${
          darkMode
            ? "bg-gray-900/95 border-gray-800"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left: Brand + back */}
            <div className="flex items-center gap-6">
              <button
                onClick={navigateToList}
                className={`text-left transition-colors ${
                  darkMode
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
                aria-label="Go to all posts"
              >
                <div className="text-2xl font-bold leading-none">BlogSpace</div>
                <div className="hidden text-sm text-gray-500 sm:block">
                  Insights, tutorials, and stories for developers
                </div>
              </button>

              {currentView !== "list" && (
                <button
                  onClick={navigateToList}
                  className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                    darkMode
                      ? "text-blue-300 hover:bg-gray-800"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  All Posts
                </button>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {isAuthenticated && currentView === "list" && (
                <button
                  onClick={navigateToCreate}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">New Post</span>
                </button>
              )}

              <button
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle theme"
                className={`rounded-lg p-2 transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
                }`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        {/* Blog List View */}
        {currentView === "list" && (
          <>
            {/* Search and Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`pl-10 pr-8 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {currentBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all",
                    darkMode
                      ? "border-gray-700 bg-gray-800 hover:shadow-gray-900/30"
                      : "border-gray-200 bg-white hover:shadow-gray-200",
                    "hover:-translate-y-0.5 hover:shadow-lg",
                  ].join(" ")}
                >
                  {/* Category badge */}
                  <div className="pointer-events-none absolute left-4 top-4 z-10">
                    <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>

                  {/* Cover */}
                  <button
                    onClick={() => navigateToSingle(blog)}
                    className="relative block"
                    aria-label={`Open ${blog.title}`}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Meta */}
                    <div className="mb-3 flex items-center text-xs">
                      <User className="mr-2 h-4 w-4 opacity-60" />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        {blog.author}
                      </span>
                      <span className="mx-2 opacity-40">•</span>
                      <Calendar className="mr-1 h-4 w-4 opacity-60" />
                      <time
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                        dateTime={blog.date}
                      >
                        {new Date(blog.date).toLocaleDateString()}
                      </time>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => navigateToSingle(blog)}
                      className={[
                        "mb-2 cursor-pointer text-lg font-semibold leading-snug transition-colors",
                        darkMode
                          ? "text-white hover:text-blue-300"
                          : "text-gray-900 hover:text-blue-700",
                      ].join(" ")}
                    >
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className={[
                        "mb-4 line-clamp-3 text-sm",
                        darkMode ? "text-gray-300" : "text-gray-600",
                      ].join(" ")}
                    >
                      {blog.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                          style={{
                            borderColor: darkMode ? "#374151" : "#E5E7EB",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <button
                        onClick={() => navigateToSingle(blog)}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Read More
                        <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>

                      {isAuthenticated && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigateToEdit(blog)}
                            className={[
                              "rounded-lg p-2 transition-colors",
                              darkMode
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100",
                            ].join(" ")}
                            aria-label="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className={[
                              "rounded-lg p-2 transition-colors",
                              darkMode
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100",
                            ].join(" ")}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 ">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Single Blog View */}
        {currentView === "single" && selectedBlog && (
          <SingleBlogView
            blog={selectedBlog}
            darkMode={darkMode}
            isAuthenticated={isAuthenticated}
            onEdit={() => navigateToEdit(selectedBlog)}
            onDelete={() => deleteBlog(selectedBlog.id)}
            onShare={{ shareToTwitter, shareToLinkedIn, copyLink }}
            navigation={getNavigationBlogs(selectedBlog)}
            onNavigate={navigateToSingle}
            comments={comments[selectedBlog.id] || []}
            newComment={newComment}
            setNewComment={setNewComment}
            onAddComment={() => addComment(selectedBlog.id)}
          />
        )}

        {/* Create/Edit Blog View */}
        {(currentView === "create" || currentView === "edit") && (
          <BlogEditor
            blog={currentView === "edit" ? selectedBlog : null}
            darkMode={darkMode}
            onSave={(data) => saveBlog(data, currentView === "edit")}
            onCancel={navigateToList}
          />
        )}
      </div>
    </div>
  );
};

// ------------------------------
// Single Blog View Component
// ------------------------------
const SingleBlogView = ({
  blog,
  darkMode,
  isAuthenticated,
  onEdit,
  onDelete,
  onShare,
  navigation,
  onNavigate,
  comments,
  newComment,
  setNewComment,
  onAddComment,
}) => {
  // Simple markdown to HTML conversion (basic only)
  const renderContent = (content) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-semibold mb-3">$1</h2>'
      )
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(
        /```([\s\S]*?)```/gim,
        '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>'
      )
      .replace(
        /`([^`]+)`/gim,
        '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>'
      )
      .replace(
        /> (.*$)/gim,
        '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">$1</blockquote>'
      )
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/^\s*/, '<p class="mb-4">')
      .replace(/\s*$/, "</p>");
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
      />

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center text-gray-500 mb-2">
            <User className="w-5 h-5 mr-2" />
            <span className="mr-6">{blog.author}</span>
            <Calendar className="w-5 h-5 mr-2" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Share buttons */}
            <button
              onClick={() => onShare.shareToTwitter(blog)}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => onShare.shareToLinkedIn(blog)}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={onShare.copyLink}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title="Copy Link"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
            {isAuthenticated && (
              <>
                <button
                  onClick={onEdit}
                  className={`p-2 rounded-lg ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } text-blue-600`}
                  title="Edit Post"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={onDelete}
                  className={`p-2 rounded-lg ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } text-red-600`}
                  title="Delete Post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <div
        className={`prose prose-lg max-w-none mb-12 ${
          darkMode ? "prose-invert" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
      />

      {/* Navigation */}
      {(navigation.previous || navigation.next) && (
        <nav className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex justify-between">
            {navigation.previous ? (
              <button
                onClick={() => onNavigate(navigation.previous)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <div>
                  <div className="text-sm text-gray-500">Previous</div>
                  <div className="font-medium">{navigation.previous.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {navigation.next && (
              <button
                onClick={() => onNavigate(navigation.next)}
                className="flex items-center text-blue-600 hover:text-blue-800 text-right"
              >
                <div>
                  <div className="text-sm text-gray-500">Next</div>
                  <div className="font-medium">{navigation.next.title}</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Comments Section */}
      <section
        className={`border-t pt-8 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <MessageCircle className="w-6 h-6 mr-2" />
          Comments ({comments.length})
        </h3>

        {/* Add Comment */}
        <div className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={`w-full p-4 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            rows={4}
          />
          <button
            onClick={onAddComment}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } border`}
            >
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">{comment.author}</span>
                <span className="text-gray-500 text-sm ml-4">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

// ------------------------------
// Blog Editor Component
// ------------------------------
const BlogEditor = ({ blog, darkMode, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    description: blog?.description || "",
    content: blog?.content || "",
    image: blog?.image || "",
    tags: blog?.tags?.join(", ") || "",
    category: blog?.category || "",
    published: blog?.published ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const prepared = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    onSave(prepared, Boolean(blog));
  };

  const handleSaveDraft = () => {
    const prepared = {
      ...formData,
      published: false,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    onSave(prepared, Boolean(blog));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">
        {blog ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            rows={3}
            required
          />
        </div>

        {/* Featured Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Technology">Technology</option>
            <option value="Tutorial">Tutorial</option>
            <option value="News">News</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="React, JavaScript, Tutorial"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Content (Markdown supported)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono`}
            rows={20}
            placeholder={`# Your Blog Title

Write your blog content here. You can use:

## Headers
**Bold text**
*Italic text*
\`inline code\`

\`\`\`javascript
// Code blocks
console.log('Hello World!');
\`\`\`

> Blockquotes

And regular paragraphs...`}
            required
          />
          <div className="text-sm text-gray-500 mt-2">
            Supports: Headers (#, ##), Bold (**text**), Italic (*text*), Code (`
            + '`code`, ```blocks```' + '), Blockquotes (text)
          </div>
        </div>

        {/* Publish Options */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="mr-2"
            />
            <span>Publish immediately</span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-3 rounded-lg border ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              {formData.published ? "Publish" : "Publish Now"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogSystem;
