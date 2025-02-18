import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarListing.css';

// Mock data for cars
const cars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    category: 'Electric',
    model: 'Performance',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    price: 99,
    rating: 4.8,
    reviews: 128,
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
    category: 'Sport',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 149,
    rating: 4.9,
    reviews: 96,
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
    category: 'SUV',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800',
    price: 179,
    rating: 4.7,
    reviews: 84,
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
    category: 'Sport',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 199,
    rating: 4.9,
    reviews: 72,
    specs: {
      seats: 2,
      transmission: 'Auto',
      speed: '0-60 mph in 3.1s',
      power: '577 hp',
    },
  },
];

const categories = [
  { id: 1, label: 'All', value: 'all' },
  { id: 2, label: 'Electric', value: 'electric' },
  { id: 3, label: 'Sport', value: 'sport' },
  { id: 4, label: 'SUV', value: 'suv' },
  { id: 5, label: 'Luxury', value: 'luxury' },
];

const sortOptions = [
  { id: 1, label: 'Best Match', value: 'best' },
  { id: 2, label: 'Price: Low to High', value: 'price_asc' },
  { id: 3, label: 'Price: High to Low', value: 'price_desc' },
  { id: 4, label: 'Rating', value: 'rating' },
];

function CarListing() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('best');
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);

  // Filter and sort cars
  useEffect(() => {
    let result = [...cars];

    // Apply category filter
    if (category !== 'all') {
      result = result.filter(car => 
        car.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply price range filter
    result = result.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'best' match - no additional sorting needed
        break;
    }

    setFilteredCars(result);
  }, [category, priceRange, sortBy, searchQuery]);

  return (
    <div className="car-listing">
      {/* Search Header */}
      <div className="search-header">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <i className="icon">🔍</i>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="content-grid">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-card">
              {/* Categories */}
              <div className="filter-section">
                <h3>Categories</h3>
                <div className="categories-list">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-chip ${category === cat.value ? 'active' : ''}`}
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-labels">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <h3>Sort by</h3>
                <div className="sort-options">
                  {sortOptions.map((option) => (
                    <label key={option.id} className="radio-option">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="cars-grid">
            <div className="grid-header">
              <h2>{filteredCars.length} cars available</h2>
              <button className="filter-button">
                <i className="icon">🔍</i> Filter & Sort
              </button>
            </div>

            <div className="cars-list">
              {filteredCars.map((car) => (
                <Link to={`/cars/${car.id}`} key={car.id} className="car-card">
                  <div className="car-image-container">
                    <img src={car.image} alt={car.name} className="car-image" />
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
                      <button className="view-button">
                        <i className="icon">→</i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredCars.length / 6) }).map((_, index) => (
                <button
                  key={index}
                  className={`page-button ${page === index + 1 ? 'active' : ''}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarListing; 