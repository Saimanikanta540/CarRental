import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';

const steps = [
  'Book your car',
  'Review details',
  'Payment',
];

// Mock insurance options
const insuranceOptions = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    price: 15,
    description: 'Covers basic liability and collision damage',
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    price: 25,
    description: 'Full coverage including theft protection and roadside assistance',
  },
];

// Mock additional options
const additionalOptions = [
  {
    id: 'gps',
    name: 'GPS Navigation',
    price: 5,
    description: 'Built-in GPS navigation system',
  },
  {
    id: 'childSeat',
    name: 'Child Seat',
    price: 8,
    description: 'Safety-certified child seat',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Hotspot',
    price: 10,
    description: '4G LTE Wi-Fi connection',
  },
];

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    insurance: 'basic',
    additionalOptions: [],
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const car = location.state?.car || {
    name: 'Tesla Model 3',
    price: 75,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
  };
  const startDate = location.state?.startDate || '';
  const endDate = location.state?.endDate || '';

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleOptionsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalOptions: checked
        ? [...prev.additionalOptions, value]
        : prev.additionalOptions.filter((option) => option !== value),
    }));
  };

  const calculateTotal = () => {
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const basePrice = car.price * days;
    const insurancePrice =
      insuranceOptions.find((option) => option.id === formData.insurance)?.price || 0;
    const optionsPrice = formData.additionalOptions.reduce(
      (sum, optionId) =>
        sum + (additionalOptions.find((option) => option.id === optionId)?.price || 0),
      0
    );
    return basePrice + insurancePrice + optionsPrice;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="form-section">
            <h2 className="section-title">Book your car</h2>
            <p className="section-subtitle">You'll be able to review before you pay</p>

            <div className="form-grid">
              {/* Pick-up Location */}
              <div className="form-field">
                <label className="form-label">Pick up</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="City, airport or address"
                  value={formData.pickup}
                  onChange={handleInputChange('pickup')}
                />
              </div>

              {/* Return Location */}
              <div className="form-field">
                <label className="form-label">Return</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Same as pickup"
                  value={formData.dropoff}
                  onChange={handleInputChange('dropoff')}
                />
              </div>

              {/* Pick-up Date & Time */}
              <div className="form-field">
                <label className="form-label">Pick-up date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.pickupDate}
                  onChange={handleInputChange('pickupDate')}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Pick-up time</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.pickupTime}
                  onChange={handleInputChange('pickupTime')}
                />
              </div>

              {/* Return Date & Time */}
              <div className="form-field">
                <label className="form-label">Return date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.returnDate}
                  onChange={handleInputChange('returnDate')}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Return time</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.returnTime}
                  onChange={handleInputChange('returnTime')}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="form-section">
            <h2 className="section-title">Review details</h2>
            
            {/* Insurance Options */}
            <div className="insurance-options">
              <h3>Insurance Coverage</h3>
              {insuranceOptions.map((option) => (
                <div
                  key={option.id}
                  className={`option-card ${formData.insurance === option.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('insurance')({ target: { value: option.id } })}
                >
                  <div className="option-header">
                    <span className="option-title">{option.name}</span>
                    <span className="option-price">₹{option.price}/day</span>
                  </div>
                  <p className="option-description">{option.description}</p>
                </div>
              ))}
            </div>

            {/* Additional Options */}
            <div className="additional-options">
              <h3>Additional Options</h3>
              <div className="checkbox-group">
                {additionalOptions.map((option) => (
                  <label key={option.id} className="checkbox-option">
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={formData.additionalOptions.includes(option.id)}
                      onChange={handleOptionsChange}
                    />
                    <div>
                      <div className="option-title">{option.name}</div>
                      <div className="option-price">₹{option.price}/day</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-section">
            <h2 className="section-title">Payment</h2>
            <div className="payment-form">
              <div className="form-field">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="card-input"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange('cardNumber')}
                />
              </div>
              <div className="card-row">
                <div className="form-field">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="card-input"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange('expiryDate')}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="card-input"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange('cvv')}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the booking data to a backend
    console.log('Booking submitted:', { formData, car, startDate, endDate });
    navigate('/dashboard');
  };

  return (
    <div className="booking-container">
      {/* Stepper */}
      <div className="stepper">
        <ul className="stepper-list">
          {steps.map((label, index) => (
            <li
              key={label}
              className={`step ${index === activeStep ? 'active' : ''} ${
                index < activeStep ? 'completed' : ''
              }`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{label}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="content-grid">
        {/* Main Content */}
        <div className="main-content">
          {renderStepContent(activeStep)}
          
          <div className="button-group">
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <div className="car-details">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-info">
              <h3>{car.name}</h3>
              <p>₹{car.price}/day</p>
            </div>
          </div>
          <div className="price-details">
            <div className="price-row">
              <span>Base Price</span>
              <span>₹{car.price}/day</span>
            </div>
            <div className="price-row">
              <span>Insurance</span>
              <span>₹{insuranceOptions.find((opt) => opt.id === formData.insurance)?.price || 0}/day</span>
            </div>
            {formData.additionalOptions.map((optionId) => {
              const option = additionalOptions.find((opt) => opt.id === optionId);
              return (
                <div key={optionId} className="price-row">
                  <span>{option?.name}</span>
                  <span>₹{option?.price}/day</span>
                </div>
              );
            })}
            <div className="total-row">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking; 