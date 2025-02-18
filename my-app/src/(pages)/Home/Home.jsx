import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Mock data for car listings
const carListings = [
  {
    id: 1,
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    price: 99,
    rating: 4.8,
    reviews: 128,
    category: 'Electric',
    specs: {
      seats: 5,
      transmission: 'Auto',
      speed: '0-60 mph in 3.1s',
      range: '358 mi range',
    },
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 149,
    rating: 4.9,
    reviews: 96,
    category: 'Sport',
    specs: {
      seats: 4,
      transmission: 'Auto',
      speed: '0-60 mph in 3.8s',
      power: '503 hp',
    },
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800',
    price: 179,
    rating: 4.7,
    reviews: 84,
    category: 'SUV',
    specs: {
      seats: 7,
      transmission: 'Auto',
      speed: '0-60 mph in 4.3s',
      power: '523 hp',
    },
  },
  {
    id: 4,
    name: 'Mercedes-AMG GT',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 199,
    rating: 4.9,
    reviews: 72,
    category: 'Sport',
    specs: {
      seats: 2,
      transmission: 'Auto',
      speed: '0-60 mph in 3.1s',
      power: '577 hp',
    },
  },
];

const features = [
  {
    icon: <i className="icon">🚗</i>,
    title: 'Electric Vehicles',
    description: 'Wide range of eco-friendly electric cars for sustainable driving.',
  },
  {
    icon: <i className="icon">🏎</i>,
    title: 'Premium Selection',
    description: 'Luxury and sports cars from top manufacturers worldwide.',
  },
  {
    icon: <i className="icon">🌿</i>,
    title: 'Eco-Friendly',
    description: 'Reduce your carbon footprint with our green vehicle options.',
  },
  {
    icon: <i className="icon">⭐</i>,
    title: 'Top Rated Service',
    description: 'Exceptional customer service and support available 24/7.',
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
  });

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Drive</h1>
            <p>Experience luxury and performance with our premium car collection. Book your dream car today.</p>

            {/* Search Form */}
            <div className="search-card">
              <div className="search-grid">
                <div className="search-field">
                  <i className="icon">📍</i>
                  <input
                    type="text"
                    placeholder="Location"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  />
                </div>
                <div className="search-field">
                  <i className="icon">📅</i>
                  <input
                    type="date"
                    placeholder="Pick-up Date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                  />
                </div>
                <div className="search-field">
                  <i className="icon">📅</i>
                  <input
                    type="date"
                    placeholder="Return Date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                  />
                </div>
                <button className="search-button">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Listings Section */}
      <section className="cars-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Discover our most popular vehicles</p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              All Cars
            </button>
            <button
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              Electric
            </button>
            <button
              className={`tab ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              Sport
            </button>
            <button
              className={`tab ${activeTab === 3 ? 'active' : ''}`}
              onClick={() => setActiveTab(3)}
            >
              SUV
            </button>
          </div>

          {/* Car Grid */}
          <div className="cars-grid">
            {carListings.map((car) => (
              <Link to={`/cars/${car.id}`} key={car.id} className="car-card">
                <div className="car-image-container">
                  <img src={car.image} alt={car.name} />
                  <span className="category-badge">{car.category}</span>
                </div>

                <div className="car-details">
                  <h3>{car.name}</h3>
                  <div className="rating">
                    <span className="stars">{'⭐'.repeat(Math.floor(car.rating))}</span>
                    <span className="reviews">({car.reviews} reviews)</span>
                  </div>

                  <div className="specs-grid">
                    <div className="spec-item">
                      <i className="icon">👥</i>
                      <span>{car.specs.seats} Seats</span>
                    </div>
                    <div className="spec-item">
                      <i className="icon">⚙️</i>
                      <span>{car.specs.transmission}</span>
                    </div>
                    <div className="spec-item">
                      <i className="icon">⚡</i>
                      <span>{car.specs.speed}</span>
                    </div>
                    <div className="spec-item">
                      <i className="icon">🔋</i>
                      <span>{car.specs.range || car.specs.power}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price">
                      <span className="amount">₹{car.price}</span>
                      <span className="period">/day</span>
                    </div>
                    <button className="view-button">→</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 