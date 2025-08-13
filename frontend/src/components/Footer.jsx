import {
  Github,
  Linkedin,
  Instagram,
  Mic,
  Book,
  Smile,
  Users,
  Heart,
  Mail,
  Home,
  BookOpen,
  BookMarked,
  Info,
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
      color: "!hover:text-emerald-500",
    },
    {
      name: "GitHub",
      href: "https://github.com/bhaktimore18/pouranik",
      icon: Github,
      color: "!hover:text-gray-800",
    },
  ];

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        {
          name: "Home",
          href: "/",
          icon: Home,
          color: "!text-emerald-500",
        },
        {
          name: "Explore Books",
          href: "/explore",
          icon: BookOpen,
          color: "!text-emerald-600",
        },
        {
          name: "Browse Genre",
          href: "/genres",
          icon: Library,
          color: "!text-emerald-700",
        },
      ],
    },
    {
      title: "Popular Categories",
      links: [
        {
          name: "Fiction",
          href: "/explore?genre=Fiction",
          icon: BookMarked,
          color: "!text-lime-500",
        },
        {
          name: "Mythology",
          href: "/explore?genre=Mythology",
          icon: Users,
          color: "!text-emerald-500",
        },
        {
          name: "Mystery & Thriller",
          href: "/explore?genre=Mystery",
          icon: Flame,
          color: "!text-yellow-600",
        },
        {
          name: "Romance",
          href: "/explore?genre=Romance",
          icon: HeartHandshake,
          color: "!text-rose-500",
        },
      ],
    },
  ];


  return (
    <footer
      className="pt-12 pb-6 !text-white"
      style={{
        background: isDarkMode
          ? "var(--neutral-50)"
          : "var(--primary-100)",
      }}
    >

      {/* <div className="max-w-6xl !mx:auto > */}
      < div className="max-w-6xl !mx-auto px-15 !lg:px-10" >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 !mb-4">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold !bg-emerald-800 bg-clip-text text-transparent">
              Pouranik
            </h2>
            <p className="!mt-4 !text-gray-700 !max-w-md">
              Discover your next favorite book with our comprehensive collection and personalized recommendations tailored to your reading journey.
            </p>
            <div className="flex space-x-4 !mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`!text-gray-500 transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="!text-gray-700 font-semibold !mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="!text-gray-600 w-fit hover:!text-gray-900 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8">
          <div className="flex flex-wrap items-center justify-center text-sm text-gray-500 space-x-5 text-center">
            <span>© {currentYear} Pouranik. All rights reserved. Built with &nbsp;</span>
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span>&nbsp; for book lovers everywhere.</span>
          </div>
        </div>



      </div >
    </footer >
  );
};

export default Footer;
