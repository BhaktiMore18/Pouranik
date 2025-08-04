import React from 'react';
import { Mail, Github } from 'lucide-react';

export default function Footer() {
return (
<>
<style jsx>{`
.footer-modern {
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
color: #e2e8f0;
position: relative;
overflow: hidden;
}

.footer-modern::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
pointer-events: none;
}

.footer-container {
max-width: 1200px;
margin: 0 auto;
padding: 32px 32px 0;
position: relative;
z-index: 1;
}

.footer-grid {
display: grid;
grid-template-columns: 2fr 1fr 1fr 1.5fr;
gap: 32px;
margin-bottom: 24px;
}

.footer-section {
position: relative;
animation: fadeInUp 0.6s ease forwards;
}

.footer-section:nth-child(2) {
animation-delay: 0.1s;
}

.footer-section:nth-child(3) {
animation-delay: 0.2s;
}

.footer-section:nth-child(4) {
animation-delay: 0.3s;
}

.footer-about {
max-width: 350px;
}

.footer-logo-brand {
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 16px;
}

.footer-logo {
font-size: 24px;
background: linear-gradient(135deg, #3b82f6, #8b5cf6);
padding: 8px;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.footer-brand-name {
font-size: 22px;
font-weight: 700;
color: #ffffff;
margin: 0 0 2px 0;
letter-spacing: -0.5px;
}

.footer-tagline {
font-size: 14px;
color: #94a3b8;
margin: 0;
font-weight: 500;
}

.footer-description {
color: #cbd5e1;
line-height: 1.6;
font-size: 14px;
margin: 0;
}

.footer-heading {
font-size: 16px;
font-weight: 600;
color: #ffffff;
margin-bottom: 16px;
position: relative;
}

.footer-heading::after {
content: '';
position: absolute;
bottom: -8px;
left: 0;
width: 30px;
height: 3px;
background: linear-gradient(135deg, #3b82f6, #8b5cf6);
border-radius: 2px;
}

.footer-links-list {
list-style: none;
padding: 0;
margin: 0;
}

.footer-links-list li {
margin-bottom: 6px;
}

.footer-link {
color: #cbd5e1;
text-decoration: none;
font-size: 14px;
transition: all 0.3s ease;
display: inline-block;
position: relative;
}

.footer-link::before {
content: '';
position: absolute;
bottom: -2px;
left: 0;
width: 0;
height: 2px;
background: linear-gradient(135deg, #3b82f6, #8b5cf6);
transition: width 0.3s ease;
}

.footer-link:hover {
color: #ffffff;
transform: translateX(4px);
}

.footer-link:hover::before {
width: 100%;
}

.footer-social-icons {
display: flex;
gap: 10px;
margin-bottom: 12px;
}

.social-icon {
display: flex;
align-items: center;
justify-content: center;
width: 36px;
height: 36px;
background: rgba(255, 255, 255, 0.08);
border-radius: 8px;
text-decoration: none;
transition: all 0.3s ease;
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.08);
}

.social-icon span {
font-size: 16px;
transition: transform 0.3s ease;
}

.social-icon:hover {
background: rgba(59, 130, 246, 0.15);
border-color: rgba(59, 130, 246, 0.25);
transform: translateY(-1px);
box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.social-icon:hover span {
transform: scale(1.1);
}

.footer-social-text {
color: #cbd5e1;
font-size: 13px;
line-height: 1.5;
margin: 0;
}

.footer-bottom {
border-top: 1px solid rgba(255, 255, 255, 0.08);
padding: 16px 0;
text-align: center;
}

.footer-copyright {
color: #94a3b8;
font-size: 13px;
margin: 0;
line-height: 1.4;
}

@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@media (max-width: 768px) {
.footer-container {
padding: 24px 16px 0;
}

.footer-grid {
grid-template-columns: 1fr;
gap: 24px;
}

.footer-about {
max-width: none;
}

.footer-logo-brand {
justify-content: center;
text-align: center;
}

.footer-description,
.footer-social-text {
text-align: center;
}

.footer-social-icons {
justify-content: center;
}
}
`}</style>

<footer className="footer-modern" data-tour="footer-section">
<div className="footer-container">
<div className="footer-grid">
{/* About Section */}
<div className="footer-section footer-about">
<div className="footer-logo-brand">
<span className="footer-logo">📚</span>
<div>
<h3 className="footer-brand-name">Pouranik</h3>
<p className="footer-tagline">Book Discovery Platform</p>
</div>
</div>
<p className="footer-description">
Discover your next favorite book with our comprehensive collection and personalized recommendations tailored to your reading journey.
</p>
</div>

{/* Quick Links */}
<div className="footer-section">
<h4 className="footer-heading">Quick Links</h4>
<ul className="footer-links-list">
<li><a href="/" className="footer-link">Home</a></li>
<li><a href="/explore" className="footer-link">Explore Books</a></li>
<li><a href="/genres" className="footer-link">Browse Genres</a></li>
<li><a href="/about" className="footer-link">About Us</a></li>
</ul>
</div>

{/* Categories */}
<div className="footer-section">
<h4 className="footer-heading">Popular Categories</h4>
<ul className="footer-links-list">
<li><a href="/explore?genre=Fiction" className="footer-link">Fiction</a></li>
<li><a href="/explore?genre=Mythology" className="footer-link">Mythology</a></li>
<li><a href="/explore?genre=Mystery" className="footer-link">Mystery & Thriller</a></li>
<li><a href="/explore?genre=Romance" className="footer-link">Romance</a></li>
<li><a href="/explore?genre=Science" className="footer-link">Science</a></li>
</ul>
</div>

{/* Connect */}
<div className="footer-section footer-connect">
<h4 className="footer-heading">Connect With Us</h4>
<div className="footer-social-icons">
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=pouranik.conduct@gmail.com" className="social-icon" aria-label="Email">
  <Mail size={18} className="text-blue-400" />
</a>

<a href="https://github.com/bhaktimore18/pouranik" className="social-icon" aria-label="GitHub">
  <Github size={18} className="text-gray-200" />
</a>
</div>
<p className="footer-social-text">
Follow us for book recommendations, reading tips, and literary discussions.
</p>
</div>
</div>

<div className="footer-bottom">
<p className="footer-copyright">
&copy; {new Date().getFullYear()} Pouranik. All rights reserved. | Built with ❤️ for book lovers everywhere
</p>
</div>
</div>
</footer>
</>
);
}

