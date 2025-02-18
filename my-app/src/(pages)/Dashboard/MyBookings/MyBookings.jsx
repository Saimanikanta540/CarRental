import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyBookings.css';

// Mock data for bookings
const bookings = [
  {
    id: 1,
    car: {
      name: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300',
    },
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    location: 'New York City',
    status: 'Active',
    price: 297,
  },
  {
    id: 2,
    car: {
      name: 'BMW M4 Competition',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300',
    },
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    location: 'Los Angeles',
    status: 'Completed',
    price: 447,
  },
  {
    id: 3,
    car: {
      name: 'Porsche 911 GT3',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=300',
    },
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    location: 'Miami',
    status: 'Cancelled',
    price: 747,
  },
];

function MyBookings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return booking.status === 'Active';
    if (tabValue === 2) return booking.status === 'Completed';
    return booking.status === 'Cancelled';
  });

  return (
    <div className="my-bookings">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">View and manage your car rentals</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${tabValue === 0 ? 'active' : ''}`}
            onClick={() => handleTabChange(0)}
          >
            All Bookings
          </button>
          <button
            className={`tab ${tabValue === 1 ? 'active' : ''}`}
            onClick={() => handleTabChange(1)}
          >
            Active
          </button>
          <button
            className={`tab ${tabValue === 2 ? 'active' : ''}`}
            onClick={() => handleTabChange(2)}
          >
            Completed
          </button>
          <button
            className={`tab ${tabValue === 3 ? 'active' : ''}`}
            onClick={() => handleTabChange(3)}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <span className="booking-id">Booking #{booking.id}</span>
                <span className={`booking-status ${getStatusClass(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-content">
                {/* Car Image */}
                <img
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="car-image"
                />

                {/* Booking Details */}
                <div className="booking-details">
                  <h3>{booking.car.name}</h3>
                  <div className="booking-info">
                    <div className="info-item">
                      <i className="icon">📅</i>
                      <span>
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <i className="icon">📍</i>
                      <span>{booking.location}</span>
                    </div>
                    <div className="info-item">
                      <i className="icon">⏱️</i>
                      <span>
                        Duration: {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="booking-price">
                  <div className="price-value">${booking.price.toFixed(2)}</div>
                  <div className="price-label">Total Price</div>
                </div>
              </div>

              {/* Actions */}
              <div className="booking-actions">
                <button
                  className="btn btn-primary"
                  disabled={booking.status !== 'Active'}
                >
                  Modify
                </button>
                <button
                  className="btn btn-danger"
                  disabled={booking.status !== 'Active'}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings; 