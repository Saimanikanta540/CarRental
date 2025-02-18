import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const pages = [
  { title: 'Home', path: '/', icon: '🏠' },
  { title: 'Browse Cars', path: '/cars', icon: '🚗' },
  { title: 'About', path: '/about', icon: 'ℹ️' },
  { title: 'Contact', path: '/contact', icon: '📞' },
];

const userMenuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: '📊' },
  { title: 'My Bookings', path: '/dashboard/bookings', icon: '📅' },
  { title: 'Saved Cars', path: '/dashboard/favorites', icon: '❤️' },
  { title: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  { title: 'Logout', path: '/logout', icon: '🚪' },
];

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="layout">
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="navbar">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Logo */}
            <Link to="/" className="logo">
              <img src="/favicon.png" alt="DriveEase" className="logo-icon" />
              <span className="logo-text">DriveEase</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`nav-link ${location.pathname === page.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{page.icon}</span>
                  {page.title}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="nav-actions">
              <Link to="/list-your-car" className="list-car-btn">
                <span className="btn-icon">➕</span>
                List Your Car
              </Link>

              <button className="notification-btn">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>

              <div className="user-menu">
                <button className="user-btn" onClick={toggleUserMenu}>
                  <div className="user-avatar">J</div>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="item-icon">{item.icon}</span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`mobile-menu-item ${location.pathname === page.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="item-icon">{page.icon}</span>
                {page.title}
              </Link>
            ))}
            <div className="menu-divider"></div>
            {userMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="mobile-menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="item-icon">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout; 