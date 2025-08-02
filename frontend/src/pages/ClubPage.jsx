// ClubPage.js
import { useState, useEffect } from "react";
import {
  Users,
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  UserPlus,
  LogOut,
  Plus,
  Clock,
  Star,
  CheckCircle,
  Moon,
  Sun,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./community.css";
import "./club.css";


const clubData = {
  name: "Mystery Maniacs",
  description: "Exploring crime and thrillers every week",
  memberCount: 256,
  coverImage:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop",
  tags: ["Mystery", "Thriller", "Crime"],
  currentBook: {
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    progress: 65,
  },
};

const discussions = [
  {
    id: 1,
    title: "What did you think about the plot twist in Chapter 12?",
    author: "Sarah Miller",
    timestamp: "2 hours ago",
    likes: 23,
    comments: 12,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612c593?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    title: "Book recommendations similar to Agatha Christie",
    author: "Michael Chen",
    timestamp: "5 hours ago",
    likes: 18,
    comments: 8,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    title: "Virtual book club meeting notes - January 15th",
    author: "Emma Davis",
    timestamp: "1 day ago",
    likes: 45,
    comments: 22,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    title: "Virtual book club meeting notes",
    author: "Emma Davis",
    timestamp: "1 day ago",
    likes: 45,
    comments: 22,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
];

const events = [
  {
    id: 1,
    title: "Author Q&A with Louise Penny",
    date: "January 25, 2024",
    time: "7:00 PM EST",
    type: "Virtual",
    attendees: 45,
    maxAttendees: 50,
  },
  {
    id: 2,
    title: "Book Discussion: The Thursday Murder Club",
    date: "January 30, 2024",
    time: "6:30 PM EST",
    type: "In-person",
    attendees: 12,
    maxAttendees: 15,
  },
  {
    id: 3,
    title: "Mystery Writing Workshop",
    date: "February 5, 2024",
    time: "2:00 PM EST",
    type: "Virtual",
    attendees: 28,
    maxAttendees: 30,
  },
];

const members = [
  {
    name: "Sarah M",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael C",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emma D",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "James L",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lisa K",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ClubPage = () => {
    const [activeTab, setActiveTab] = useState("discussions");

    useEffect(() => {
    window.scrollTo(0, 0);
}, []);

return (
  <div className="club-page-container">
    {/* Club Hero Section */}
    <div className="club-hero-section">
      <div className="club-hero-cover" style={{ backgroundImage: `url(${clubData.coverImage})` }}>
        <div className="club-hero-overlay" />
        <div className="club-hero-content">
          <div className="club-container">
            <h1 className="club-title-main">{clubData.name}</h1>
            <p className="club-description-main">{clubData.description}</p>

            <div className="club-hero-meta">
              <div className="club-hero-members">
                <Users className="club-icon-sm" />
                <span>{clubData.memberCount} members</span>
              </div>

              <div className="club-hero-tags">
                {clubData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="club-badge club-badge-secondary club-badge-hero"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons & Member Avatars */}
      <div className="club-action-bar">
        <div className="club-container club-action-bar-inner">
          <div className="club-member-avatars">
            <div className="club-avatar-group">
              {members.slice(0, 5).map((member, index) => (
                <div
                  key={index}
                  className="club-avatar club-avatar-md club-avatar-border"
                >
                  {member.avatar ? ( // Conditionally render the image if member.avatar exists
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="club-avatar-img"
                    />
                  ) : ( // Otherwise, render the fallback div
                    <div className="club-avatar-fallback">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
              ))}
              <div className="club-avatar club-avatar-md club-avatar-border club-avatar-more">
                +{clubData.memberCount - 5}
              </div>
            </div>
          </div>

          <div className="club-action-buttons">
            <button className="club-button club-button-outline club-button-sm">
              <UserPlus className="club-icon-sm club-icon-mr" />
              Invite
            </button>
            <button className="club-button club-button-outline club-button-sm">
              <LogOut className="club-icon-sm club-icon-mr" />
              Leave Club
            </button>
            <button className="club-button club-button-primary club-button-sm">
              <Plus className="club-icon-sm club-icon-mr" />
              New Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="club-container club-main-content-area">
      <div className="club-grid-main">
        {/* Main Content (Tabs) */}
        <div className="club-main-column">
          <div className="club-tabs-container">
            <div className="club-tabs-list">
              <button
                className={`club-tabs-trigger ${
                  activeTab === "discussions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("discussions")}
              >
                Discussions
              </button>
              <button
                className={`club-tabs-trigger ${
                  activeTab === "events" ? "active" : ""
                }`}
                onClick={() => setActiveTab("events")}
              >
                Events
              </button>
              <button
                className={`club-tabs-trigger ${
                  activeTab === "current-reads" ? "active" : ""
                }`}
                onClick={() => setActiveTab("current-reads")}
              >
                Current Reads
              </button>
            </div>

            {activeTab === "discussions" && (
              <div className="club-tab-content club-tab-content-discussions">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="club-card club-card-discussion"
                  >
                    <div className="club-card-header club-card-header-discussion">
                      <div className="club-discussion-meta">
                        <div className="club-avatar club-avatar-md">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="club-avatar-img"
                          />
                          <div className="club-avatar-fallback">
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                        <div>
                          <h3 className="club-discussion-title">
                            {discussion.title}
                          </h3>
                          <p className="club-discussion-author">
                            by {discussion.author} • {discussion.timestamp}
                          </p>
                        </div>
                      </div>
                      <button className="club-icon-button club-icon-button-sm">
                        <MoreVertical className="club-icon-sm" />
                      </button>
                    </div>
                    <div className="club-card-content">
                      <div className="club-discussion-actions">
                        <button className="club-button club-button-ghost club-button-sm">
                          <Heart className="club-icon-sm club-icon-mr" />
                          {discussion.likes}
                        </button>
                        <button className="club-button club-button-ghost club-button-sm">
                          <MessageCircle className="club-icon-sm club-icon-mr" />
                          {discussion.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="club-tab-content club-tab-content-events">
                {events.map((event) => (
                  <div key={event.id} className="club-card club-card-event">
                    <div className="club-card-header">
                      <div className="club-event-details">
                        <div>
                          <h3 className="club-event-title">{event.title}</h3>
                          <div className="club-event-meta-info">
                            <div className="club-event-meta-item">
                              <Calendar className="club-icon-sm" />
                              <span>{event.date}</span>
                            </div>
                            <div className="club-event-meta-item">
                              <Clock className="club-icon-sm" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`club-badge ${
                            event.type === "Virtual"
                              ? "club-badge-secondary"
                              : "club-badge-outline"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="club-card-content">
                      <div className="club-event-meta-data">
                        <div className="club-event-attendees">
                          {event.attendees}/{event.maxAttendees} attending
                        </div>
                        <button className="club-button club-button-primary club-button-sm">
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "current-reads" && (
              <div className="club-tab-content club-tab-content-current-reads">
                <div className="club-card club-card-current-book">
                  <div className="club-card-header">
                    <h3 className="club-card-title">Currently Reading</h3>
                    <p className="club-card-description">
                      Club's current book selection
                    </p>
                  </div>
                  <div className="club-card-content club-current-book-details">
                    <img
                      src={clubData.currentBook.cover}
                      alt={clubData.currentBook.title}
                      className="club-current-book-cover"
                    />
                    <div className="club-current-book-info">
                      <div>
                        <h3 className="club-current-book-title">
                          {clubData.currentBook.title}
                        </h3>
                        <p className="club-current-book-author">
                          by {clubData.currentBook.author}
                        </p>
                      </div>

                      <div className="club-progress-section">
                        <div className="club-progress-header">
                          <span className="club-progress-label">
                            Reading Progress
                          </span>
                          <span className="club-progress-percentage">
                            {clubData.currentBook.progress}%
                          </span>
                        </div>
                        <div className="club-progress-bar-bg">
                          <div
                            className="club-progress-bar-fill"
                            style={{
                              width: `${clubData.currentBook.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="club-rating-display">
                        <Star className="club-icon-star" />
                        <Star className="club-icon-star" />
                        <Star className="club-icon-star" />
                        <Star className="club-icon-star" />
                        <Star className="club-icon-star-empty" />
                        <span className="club-rating-text">
                          4.2/5 (Club Rating)
                        </span>
                      </div>

                      <button className="club-button club-button-primary club-button-full-width">
                        <MessageCircle className="club-icon-sm club-icon-mr" />
                        Join Book Discussion
                      </button>
                    </div>
                  </div>
                </div>

                <div className="club-card club-card-suggest-book">
                  <div className="club-card-header">
                    <h3 className="club-card-title">Suggest Next Read</h3>
                    <p className="club-card-description">
                      Help choose our next book adventure
                    </p>
                  </div>
                  <div className="club-card-content">
                    <button className="club-button club-button-outline club-button-full-width">
                      <Plus className="club-icon-sm club-icon-mr" />
                      Suggest a Book
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="club-sidebar-column">
          <div className="club-card club-card-rules">
            <div className="club-card-header">
              <h3 className="club-card-title club-card-title-lg">Club Rules</h3>
            </div>
            <div className="club-card-content club-card-content-rules">
              <div className="club-rule-item">
                <CheckCircle className="club-icon-sm club-icon-primary club-icon-flex-shrink" />
                <span>Be respectful and constructive in discussions</span>
              </div>
              <div className="club-rule-item">
                <CheckCircle className="club-icon-sm club-icon-primary club-icon-flex-shrink" />
                <span>No spoilers without proper warnings</span>
              </div>
              <div className="club-rule-item">
                <CheckCircle className="club-icon-sm club-icon-primary club-icon-flex-shrink" />
                <span>Stay on topic and book-related</span>
              </div>
              <div className="club-rule-item">
                <CheckCircle className="club-icon-sm club-icon-primary club-icon-flex-shrink" />
                <span>Participate actively in club activities</span>
              </div>
            </div>
          </div>

          <div className="club-card club-card-admins">
            <div className="club-card-header">
              <h3 className="club-card-title club-card-title-lg">
                Admins & Moderators
              </h3>
            </div>
            <div className="club-card-content club-card-content-admins">
              <div className="club-admin-item">
                <div className="club-avatar club-avatar-md">
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sarah Miller"
                    className="club-avatar-img"
                  />
                </div>
                <div>
                  <p className="club-admin-name">Sarah Miller</p>
                  <p className="club-admin-role">Admin</p>
                </div>
              </div>
              <div className="club-admin-item">
                <div className="club-avatar club-avatar-md">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                    alt="Emma Davis"
                    className="club-avatar-img"
                  />
                </div>
                <div>
                  <p className="club-admin-name">Emma Davis</p>
                  <p className="club-admin-role">Moderator</p>
                </div>
              </div>
            </div>
          </div>

          <div className="club-card club-card-suggestion-box">
            <div className="club-card-header">
              <h3 className="club-card-title club-card-title-lg">
                Book Suggestion Box
              </h3>
            </div>
            <div className="club-card-content">
              <p className="club-suggestion-text">
                Have a book recommendation? Share it with the community!
              </p>
              <button className="club-button club-button-outline club-button-sm club-button-full-width">
                <BookOpen className="club-icon-sm club-icon-mr" />
                Submit Suggestion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ClubPage;
