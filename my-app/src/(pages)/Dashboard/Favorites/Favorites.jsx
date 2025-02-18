import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

// Mock data for saved cars
const savedCars = [
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
    name: 'Porsche 911 GT3',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800',
    price: 249,
    rating: 5.0,
    reviews: 64,
    category: 'Sport',
    specs: {
      seats: 2,
      transmission: 'Manual',
      speed: '0-60 mph in 3.2s',
      power: '502 hp',
    },
  },
];

function Favorites() {
  const [favorites, setFavorites] = useState(savedCars);

  const handleRemoveFavorite = (carId) => {
    setFavorites(favorites.filter(car => car.id !== carId));
  };

  return (
    <div className="favorites">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Saved Cars</h1>
          <p>Your favorite vehicles for quick access</p>
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {favorites.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
                <button 
                  className="favorite-btn"
                  onClick={() => handleRemoveFavorite(car.id)}
                >
                  ❤️
                </button>
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
                    <span>{car.specs.seats} seats</span>
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
                    <span>{car.specs.range}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="price">
                    <span className="amount">₹{car.price}</span>
                    <span className="period">/day</span>
                  </div>
                  <Link to={`/cars/${car.id}`} className="rent-button">
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h2>No Saved Cars</h2>
            <p>Start saving your favorite cars for quick access</p>
            <Link to="/cars" className="browse-button">
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites; 