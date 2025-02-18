import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PeerToPeer.css';

const carTypes = ['Sedan', 'SUV', 'Sports', 'Electric', 'Luxury', 'Van'];
const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

const steps = ['Vehicle Details', 'Photos & Documents', 'Pricing & Availability'];

// Mock market price suggestions based on car type
const marketPriceSuggestions = {
  Sedan: { min: 40, max: 80 },
  SUV: { min: 50, max: 100 },
  Sports: { min: 100, max: 200 },
  Electric: { min: 60, max: 120 },
  Luxury: { min: 120, max: 250 },
  Van: { min: 70, max: 150 },
};

function PeerToPeer() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    transmission: '',
    fuelType: '',
    seats: '',
    licensePlate: '',
    description: '',
    photos: [],
    registration: null,
    insurance: null,
    pricePerDay: '',
    minimumDays: '1',
    availableFrom: '',
    availableTo: '',
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'photos' ? [...prev.photos, ...files] : files[0],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.make) newErrors.make = 'Make is required';
        if (!formData.model) newErrors.model = 'Model is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.type) newErrors.type = 'Vehicle type is required';
        if (!formData.transmission) newErrors.transmission = 'Transmission type is required';
        if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
        if (!formData.seats) newErrors.seats = 'Number of seats is required';
        break;
      case 1:
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        if (!formData.registration) newErrors.registration = 'Registration document is required';
        if (!formData.insurance) newErrors.insurance = 'Insurance document is required';
        break;
      case 2:
        if (!formData.pricePerDay) newErrors.pricePerDay = 'Price per day is required';
        if (!formData.availableFrom) newErrors.availableFrom = 'Start date is required';
        if (!formData.availableTo) newErrors.availableTo = 'End date is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Here you would typically submit the form data to a backend
      console.log('Form submitted:', formData);
      navigate('/dashboard');
    }
  };

  const getSuggestedPrice = () => {
    if (!formData.type) return null;
    const { min, max } = marketPriceSuggestions[formData.type];
    return { min, max };
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label required" htmlFor="make">
                Make
              </label>
              <input
                id="make"
                type="text"
                className={`form-input ${errors.make ? 'error' : ''}`}
                name="make"
                value={formData.make}
                onChange={handleInputChange}
              />
              {errors.make && <span className="form-error">{errors.make}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="model">
                Model
              </label>
              <input
                id="model"
                type="text"
                className={`form-input ${errors.model ? 'error' : ''}`}
                name="model"
                value={formData.model}
                onChange={handleInputChange}
              />
              {errors.model && <span className="form-error">{errors.model}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                type="number"
                className={`form-input ${errors.year ? 'error' : ''}`}
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="type">
                Vehicle Type
              </label>
              <select
                id="type"
                className={`form-select ${errors.type ? 'error' : ''}`}
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select type</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && <span className="form-error">{errors.type}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="transmission">
                Transmission
              </label>
              <select
                id="transmission"
                className={`form-select ${errors.transmission ? 'error' : ''}`}
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
              >
                <option value="">Select transmission</option>
                {transmissionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.transmission && (
                <span className="form-error">{errors.transmission}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="fuelType">
                Fuel Type
              </label>
              <select
                id="fuelType"
                className={`form-select ${errors.fuelType ? 'error' : ''}`}
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
              >
                <option value="">Select fuel type</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.fuelType && <span className="form-error">{errors.fuelType}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="seats">
                Number of Seats
              </label>
              <input
                id="seats"
                type="number"
                className={`form-input ${errors.seats ? 'error' : ''}`}
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
              />
              {errors.seats && <span className="form-error">{errors.seats}</span>}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label required">Vehicle Photos</label>
              <div
                className={`file-upload ${errors.photos ? 'error' : ''}`}
                onClick={() => document.getElementById('photos').click()}
              >
                <span className="material-icons file-upload-icon">cloud_upload</span>
                <p className="file-upload-text">Click to upload photos</p>
                <p className="file-upload-subtext">
                  Upload high-quality photos of your vehicle
                </p>
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'photos')}
                />
              </div>
              {formData.photos.length > 0 && (
                <div className="uploaded-files">
                  {formData.photos.map((file, index) => (
                    <div key={index} className="uploaded-file">
                      <span className="material-icons">image</span>
                      <span className="uploaded-file-name">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {errors.photos && <span className="form-error">{errors.photos}</span>}
            </div>
            <div className="form-field">
              <label className="form-label required">Registration Document</label>
              <div
                className={`file-upload ${errors.registration ? 'error' : ''}`}
                onClick={() => document.getElementById('registration').click()}
              >
                <span className="material-icons file-upload-icon">description</span>
                <p className="file-upload-text">Upload registration document</p>
                <p className="file-upload-subtext">PDF or image file</p>
                <input
                  id="registration"
                  type="file"
                  accept=".pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'registration')}
                />
              </div>
              {formData.registration && (
                <div className="uploaded-files">
                  <div className="uploaded-file">
                    <span className="material-icons">description</span>
                    <span className="uploaded-file-name">
                      {formData.registration.name}
                    </span>
                  </div>
                </div>
              )}
              {errors.registration && (
                <span className="form-error">{errors.registration}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Insurance Document</label>
              <div
                className={`file-upload ${errors.insurance ? 'error' : ''}`}
                onClick={() => document.getElementById('insurance').click()}
              >
                <span className="material-icons file-upload-icon">description</span>
                <p className="file-upload-text">Upload insurance document</p>
                <p className="file-upload-subtext">PDF or image file</p>
                <input
                  id="insurance"
                  type="file"
                  accept=".pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'insurance')}
                />
              </div>
              {formData.insurance && (
                <div className="uploaded-files">
                  <div className="uploaded-file">
                    <span className="material-icons">description</span>
                    <span className="uploaded-file-name">
                      {formData.insurance.name}
                    </span>
                  </div>
                </div>
              )}
              {errors.insurance && (
                <span className="form-error">{errors.insurance}</span>
              )}
            </div>
          </div>
        );
      case 2:
        const suggestedPrice = getSuggestedPrice();
        return (
          <div className="form-grid">
            {suggestedPrice && (
              <div className="price-suggestion">
                <h4 className="price-suggestion-title">Market Price Suggestion</h4>
                <p className="price-suggestion-text">
                  Based on similar vehicles in your area, we suggest pricing between $
                  {suggestedPrice.min} - ${suggestedPrice.max} per day
                </p>
              </div>
            )}
            <div className="form-field">
              <label className="form-label required" htmlFor="pricePerDay">
                Price per Day ($)
              </label>
              <input
                id="pricePerDay"
                type="number"
                className={`form-input ${errors.pricePerDay ? 'error' : ''}`}
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleInputChange}
              />
              {errors.pricePerDay && (
                <span className="form-error">{errors.pricePerDay}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="availableFrom">
                Available From
              </label>
              <input
                id="availableFrom"
                type="date"
                className={`form-input ${errors.availableFrom ? 'error' : ''}`}
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleInputChange}
              />
              {errors.availableFrom && (
                <span className="form-error">{errors.availableFrom}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required" htmlFor="availableTo">
                Available To
              </label>
              <input
                id="availableTo"
                type="date"
                className={`form-input ${errors.availableTo ? 'error' : ''}`}
                name="availableTo"
                value={formData.availableTo}
                onChange={handleInputChange}
              />
              {errors.availableTo && (
                <span className="form-error">{errors.availableTo}</span>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="peer-to-peer">
      <div className="container">
        <h1 className="page-title">List Your Vehicle</h1>

        <div className="stepper">
          <ul className="stepper-list">
            {steps.map((label, index) => (
              <li
                key={label}
                className={`step ${
                  index === activeStep
                    ? 'active'
                    : index < activeStep
                    ? 'completed'
                    : ''
                }`}
              >
                <div className="step-number">
                  {index < activeStep ? (
                    <span className="material-icons">check</span>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="step-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-section">{getStepContent(activeStep)}</div>

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
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeerToPeer; 