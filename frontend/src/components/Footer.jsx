import {
  Github,
  Linkedin,
  Users,
  Heart,
  Mail,
  Home,
  BookOpen,
  BookMarked,
  Shield,
  Library,
  Flame,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Mail",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=pouranik.conduct@gmail.com",
      icon: Mail,
      color: "hover:text-emerald-400",
    },
    {
      name: "GitHub",
      href: "https://github.com/bhaktimore18/pouranik",
      icon: Github,
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/bhakti-more-01a619208/",
      icon: Linkedin,
      color: "hover:text-blue-400",
    },
  ];

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/", icon: Home },
        { name: "Explore Books", href: "/explore", icon: BookOpen },
        { name: "Browse Genre", href: "/genres", icon: Library },
        { name: "Privacy Policy", href: "/privacy", icon: Shield },
      ],
    },
    {
      title: "Popular Categories",
      links: [
        { name: "Fiction", href: "/explore?genre=Fiction", icon: BookMarked },
        { name: "Mythology", href: "/explore?genre=Mythology", icon: Users },
        {
          name: "Mystery & Thriller",
          href: "/explore?genre=Mystery",
          icon: Flame,
        },
        {
          name: "Romance",
          href: "/explore?genre=Romance",
          icon: HeartHandshake,
        },
      ],
    },
  ];

  return (
    <footer
      className={`pt-12 pb-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              Pouranik
            </h2>
            <p
              className={`mt-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-md`}
            >
              Discover your next favorite book with our comprehensive collection
              and personalized recommendations tailored to your reading journey.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3
                className={`font-semibold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`${
                        isDarkMode
                          ? "text-gray-400 hover:text-emerald-400"
                          : "text-gray-600 hover:text-emerald-600"
                      } no-underline w-fit transition-colors duration-200 flex items-center gap-2`}
                    >
                      <link.icon className="w-4 h-4 text-emerald-500" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 border-gray-700">
          <div className="flex flex-wrap items-center justify-center text-sm space-x-1 text-center">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              © {currentYear} Pouranik. All rights reserved. Built with
            </span>
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              for book lovers everywhere.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
