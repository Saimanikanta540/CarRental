import React from 'react';
import './About.css';

const stats = [
  {
    value: '10K+',
    label: 'Happy Customers',
    icon: '👥',
  },
  {
    value: '500+',
    label: 'Premium Vehicles',
    icon: '🚗',
  },
  {
    value: '50+',
    label: 'Locations',
    icon: '📍',
  },
  {
    value: '24/7',
    label: 'Customer Support',
    icon: '💬',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'Electric Fleet',
    description: 'Leading the way in sustainable transportation with our electric vehicle options.',
  },
  {
    icon: '🛡️',
    title: 'Safety First',
    description: 'All our vehicles undergo rigorous safety inspections and maintenance.',
  },
  {
    icon: '⭐',
    title: 'Award Winning',
    description: 'Recognized for excellence in customer service and vehicle quality.',
  },
  {
    icon: '🌱',
    title: 'Eco-Friendly',
    description: 'Committed to reducing environmental impact through sustainable practices.',
  },
];

const team = [
  {
    name: 'Pasumarthi Sai Manikanta',
  },
  {
    name: 'Mulla Javeed',
  },
  {
    name: 'Varshitha Nagothu',
  },
];

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="grid-container">
            <div className="hero-content">
              <h1>Driving the Future of Mobility</h1>
              <h2>
                We're revolutionizing the car rental experience with premium vehicles and exceptional service.
              </h2>
              <div className="button-group">
                <button className="button button-primary">Learn More</button>
                <button className="button button-secondary">Contact Us</button>
              </div>
            </div>
            <div>
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800"
                alt="Luxury Car"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>
              Experience the difference with our premium service and exceptional fleet of vehicles.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>
              Dedicated professionals committed to providing you with the best car rental experience.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-avatar">
                  {/* Placeholder avatar */}
                  {member.name.charAt(0)}
                </div>
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 