import './Contact.css';

const contactInfo = [
  {
    icon: '📞',
    title: 'Phone',
    details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
  },
  {
    icon: '📧',
    title: 'Email',
    details: ['support@drive.com', 'info@drive.com'],
  },
  {
    icon: '📍',
    title: 'Location',
    details: ['123 Business Street', 'New York, NY 10001'],
  },
  {
    icon: '⏰',
    title: 'Business Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM'],
  },
];

const socialLinks = [
  { icon: 'facebook', name: 'Facebook', url: '#' },
  { icon: 'twitter', name: 'Twitter', url: '#' },
  { icon: 'linkedin', name: 'LinkedIn', url: '#' },
  { icon: 'instagram', name: 'Instagram', url: '#' },
];

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Get in Touch</h1>
              <p>
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <i className={`icon-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=800"
                alt="Contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels</p>
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Message</h2>
                <p>Fill out the form below and we'll get back to you shortly</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="icon-email">📧</i>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Message"
                    required
                    rows="4"
                    className="form-input"
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message <span className="icon-send">📤</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 