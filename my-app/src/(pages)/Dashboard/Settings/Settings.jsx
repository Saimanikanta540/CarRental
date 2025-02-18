import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account settings and preferences</p>
        </div>

        {/* Success Alert */}
        {saved && (
          <div className="alert alert-success">
            Settings saved successfully!
          </div>
        )}

        <div className="settings-grid">
          {/* Profile Section */}
          <div className="settings-nav">
            <div className="profile-header">
              <div className="avatar-upload">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="avatar"
                />
                <label className="upload-btn">
                  <input type="file" hidden />
                  📷
                </label>
              </div>
              <h3>John Smith</h3>
              <p>john.smith@example.com</p>
            </div>
            <button className="btn btn-danger">
              Delete Account
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {/* Personal Information */}
            <section className="form-section">
              <h2 className="section-title">
                <i className="icon">👤</i> Personal Information
              </h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue="John"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue="Smith"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    defaultValue="john.smith@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="form-section">
              <h2 className="section-title">
                <i className="icon">🔔</i> Notifications
              </h2>
              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Email Notifications</h4>
                    <p>Receive booking updates and reminders</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                      name="email"
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Push Notifications</h4>
                    <p>Receive notifications on your device</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={handleNotificationChange}
                      name="push"
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Marketing Emails</h4>
                    <p>Receive offers and updates from us</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={handleNotificationChange}
                      name="marketing"
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="form-section">
              <h2 className="section-title">
                <i className="icon">🔒</i> Security
              </h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="form-section">
              <h2 className="section-title">
                <i className="icon">🌐</i> Preferences
              </h2>
              <div className="form-group">
                <label className="form-label">Language</label>
                <select className="form-input" defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </section>

            {/* Save Button */}
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 