import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CarDetails.css';

// Mock data for car details
const carDetails = {
  id: 1,
  name: 'Tesla Model 3',
  description: 'The Tesla Model 3 is an all-electric four-door sedan with cutting-edge technology, impressive range, and outstanding performance. Experience the future of driving with this premium electric vehicle.',
  images: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1920',
  ],
  features: [
    { id: 1, name: 'Autopilot' },
    { id: 2, name: '15" Touchscreen' },
    { id: 3, name: 'Premium Audio' },
    { id: 4, name: 'Glass Roof' },
  ],
  specifications: [
    { name: 'Range', value: '358 miles' },
    { name: 'Top Speed', value: '162 mph' },
    { name: '0-60 mph', value: '3.1 seconds' },
    { name: 'Peak Power', value: '450 hp' },
    { name: 'Seating', value: '5 adults' },
    { name: 'Drive', value: 'Dual Motor AWD' },
  ],
  price: 150,
};

// Mock data for calendar availability
const calendar = {
  month: 'Jul 2024',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
};

function CarDetails() {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div className="car-details">
      {/* Hero Image */}
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${carDetails.images[0]})` }}
      >
        <div className="overlay"></div>
      </div>

      <div className="container">
        {/* Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cars">Cars</Link> / {carDetails.name}
        </div>

        <div className="content-grid">
          <div className="main-content">
            {/* Overview Section */}
            <section className="section">
              <h2 className="section-title">Overview</h2>
              <p className="section-description">{carDetails.description}</p>

              {/* Features */}
              <div className="features-list">
                {carDetails.features.map((feature) => (
                  <span key={feature.id} className="feature-chip">
                    {feature.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Specifications Section */}
            <section className="section">
              <h2 className="section-title">Specifications</h2>
              <div className="specs-grid">
                {carDetails.specifications.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.name}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <div className="booking-card">
            <h3 className="card-title">Availability</h3>

            {/* Calendar Header */}
            <div className="calendar-header">
              <button className="calendar-nav">←</button>
              <span className="calendar-month">{calendar.month}</span>
              <button className="calendar-nav">→</button>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
              {calendar.days.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day.available ? 'available' : 'unavailable'}`}
                >
                  {day.day}
                </div>
              ))}
            </div>

            {/* Price Info */}
            <div className="price-info">
              <div className="price-details">
                <span className="price-amount">₹{carDetails.price}</span>
                <span className="price-period">/day</span>
              </div>
              <p className="price-note">*Prices may vary depending on the rental duration</p>
            </div>

            {/* Book Now Button */}
            <Link to={`/booking/${carDetails.id}`} className="book-button">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails; 