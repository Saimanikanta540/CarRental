import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <span className="material-icons error-icon">sentiment_very_dissatisfied</span>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound; 