import React from "react";
import { Link } from "react-router-dom";
import { Eye, ClipboardList, Lock, Users, ShieldCheck } from "lucide-react";

const Privacy = () => {
  const privacySections = [
    {
      id: "information-collection",
      icon: <Eye className="w-6 h-6 text-primary-700" />,
      title: "Information Collection",
      content:
        "We collect information when you register, use interactive features, or contact support. This helps us provide better services and understand user needs.",
    },
    {
      id: "use-of-information",
      icon: <ClipboardList className="w-6 h-6 text-primary-700" />,
      title: "Use of Information",
      content:
        "We use collected information to improve services, personalize your experience, respond to your inquiries, and ensure platform security.",
    },
    {
      id: "data-protection",
      icon: <Lock className="w-6 h-6 text-primary-700" />,
      title: "Data Protection",
      content:
        "We implement encryption, regular security audits, and limited access to personal data to ensure your privacy is always protected.",
    },
    {
      id: "third-party-services",
      icon: <Users className="w-6 h-6 text-primary-700" />,
      title: "Third-Party Services",
      content:
        "We may use services like Google Books API and Google Analytics to improve functionality and user experience.",
    },
    {
      id: "your-rights",
      icon: <ShieldCheck className="w-6 h-6 text-primary-700" />,
      title: "Your Rights",
      content:
        "You can access, correct, or delete your data and control how your information is used on our platform.",
    },
  ];

  return (
    <div
      className="min-h-screen flex justify-center items-start font-sans"
      style={{
        background: "var(--background-primary)",
        color: "var(--text-primary)",
        padding: "4rem 1rem",
      }}
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block relative mb-6">
            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="text-primary-700">Privacy</span>{" "}
              <span className="text-accent-orange">Policy</span>
            </h1>
            <div className="absolute -inset-1 blur-lg bg-accent-orange/30 -z-10 rounded-xl"></div>
          </div>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Learn how we collect, use, and protect your information at Pouranik.
          </p>

          <div
            className="inline-flex items-center px-4 py-2 mt-6 rounded-full border text-sm shadow-sm"
            style={{
              background: "var(--primary-50)",
              borderColor: "var(--primary-200)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full mr-2"
              style={{ background: "var(--accent-green)" }}
            ></span>
            <span className="text-text-secondary">
              Last Updated: August 13, 2025
            </span>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {privacySections.map((section, i) => (
            <div
              key={section.id}
              className="p-8 rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-50), var(--primary-100))",
                border: "1px solid var(--primary-200)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-sm bg-primary-200">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-primary-700">
                  {i + 1}. {section.title}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-text-secondary pl-18">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t mt-20 pt-6 text-center">
          <p className="text-sm text-text-secondary">
            © 2025 Pouranik — Read. Share. Connect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
