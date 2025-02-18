import { Link } from 'react-router-dom';
import './Dashboard.css';

// Mock data
const stats = [
  {
    icon: '🚗',
    label: 'Total Rentals',
    value: '12',
    progress: 75,
  },
  {
    icon: '📅',
    label: 'Active Bookings',
    value: '2',
    progress: 25,
  },
  {
    icon: '❤️',
    label: 'Saved Cars',
    value: '8',
    progress: 60,
  },
  {
    icon: '⭐',
    label: 'Reviews Given',
    value: '15',
    progress: 90,
  },
];

const recentBookings = [
  {
    id: 1,
    car: 'Tesla Model 3',
    date: '15 Jul - 18 Jul',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300',
    price: 99,
    specs: {
      range: '358 mi range',
      speed: '0-60 mph in 3.1s',
    },
  },
  {
    id: 2,
    car: 'BMW M4',
    date: '10 Jul - 12 Jul',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300',
    price: 149,
    specs: {
      power: '503 hp',
      speed: '0-60 mph in 3.8s',
    },
  },
];

const quickActions = [
  {
    title: 'Browse Cars',
    description: 'Explore our premium collection of vehicles',
    icon: '🚗',
    link: '/cars',
  },
  {
    title: 'My Bookings',
    description: 'View and manage your reservations',
    icon: '📅',
    link: '/dashboard/bookings',
  },
  {
    title: 'Saved Cars',
    description: 'Access your favorite vehicles',
    icon: '❤️',
    link: '/dashboard/favorites',
  },
  {
    title: 'Settings',
    description: 'Manage your account preferences',
    icon: '⚙️',
    link: '/dashboard/settings',
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="user-info">
            <div className="avatar">S</div>
            <div className="welcome-text">
              <h1>Welcome back, Sai Manikanta!</h1>
              <p>Here's what's happening with your rentals</p>
            </div>
          </div>
          <button className="notification-btn">🔔</button>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
              <div className="stat-info">
                <div className="stat-label">
                  <span>{stat.label}</span>
                  <span>{stat.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <Link to={action.link} key={index} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <div className="learn-more">
                  Learn More <span className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Bookings */}
        <section className="recent-bookings">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <Link to="/dashboard/bookings" className="view-all">
              View All <span className="arrow">→</span>
            </Link>
          </div>
          <div className="bookings-list">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-content">
                  <img 
                    src={booking.image} 
                    alt={booking.car} 
                    className="car-image"
                  />
                  <div className="booking-details">
                    <div className="booking-header">
                      <h3>{booking.car}</h3>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="booking-date">{booking.date}</p>
                    <div className="specs">
                      <div className="spec">
                        <span className="icon">⚡</span>
                        <span>{booking.specs.speed}</span>
                      </div>
                      <div className="spec">
                        <span className="icon">
                          {booking.specs.range ? '🔋' : '🚗'}
                        </span>
                        <span>{booking.specs.range || booking.specs.power}</span>
                      </div>
                    </div>
                  </div>
                  <div className="booking-price">
                    <span className="amount">${booking.price}</span>
                    <span className="period">/day</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 